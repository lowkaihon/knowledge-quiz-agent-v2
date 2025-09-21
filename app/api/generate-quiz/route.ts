import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(["multiple-choice", "true-false", "short-answer"]),
  question: z.string(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string(),
})

const QuizSchema = z.object({
  questions: z.array(QuestionSchema),
})

export async function POST(request: Request) {
  try {
    const { studyMaterial, config } = await request.json()

    if (!studyMaterial || !config) {
      return Response.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const { length, difficulty, questionTypes } = config

    // Create a detailed prompt for quiz generation
    const prompt = `
You are an expert quiz generator. Create a comprehensive quiz based on the provided study material.

Study Material:
${studyMaterial}

Quiz Requirements:
- Number of questions: ${length}
- Difficulty level: ${difficulty}
- Question types: ${questionTypes.join(", ")}

Instructions:
1. Generate exactly ${length} questions from the study material
2. Distribute question types as evenly as possible among: ${questionTypes.join(", ")}
3. For multiple-choice questions: provide exactly 4 options with only 1 correct answer
4. For true-false questions: make statements that can be clearly true or false
5. For short-answer questions: create fill-in-the-blank style questions
6. Difficulty level "${difficulty}":
   - Easy: Basic recall and understanding
   - Medium: Application and analysis
   - Hard: Synthesis and evaluation
7. Each question must include a detailed explanation referencing the original material
8. Ensure questions cover different parts of the study material
9. Make questions specific and avoid ambiguity
10. For multiple-choice, ensure distractors are plausible but clearly incorrect

Generate unique IDs for each question using the format "q1", "q2", etc.
`

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      prompt,
      schema: QuizSchema,
    })

    // Validate and process the generated quiz
    const processedQuestions = result.object.questions.map((question, index) => ({
      ...question,
      id: `q${index + 1}`,
    }))

    return Response.json({
      questions: processedQuestions,
      metadata: {
        totalQuestions: processedQuestions.length,
        difficulty,
        questionTypes,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error generating quiz:", error)
    return Response.json({ error: "Failed to generate quiz. Please try again." }, { status: 500 })
  }
}
