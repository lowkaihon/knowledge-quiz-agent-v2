"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { QuizConfiguration } from "@/components/quiz-configuration"
import { QuizInterface } from "@/components/quiz-interface"
import { QuizResults } from "@/components/quiz-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, FileText, Trophy } from "lucide-react"

type AppState = "upload" | "configure" | "quiz" | "results"

interface QuizData {
  questions: Array<{
    id: string
    type: "multiple-choice" | "true-false" | "short-answer"
    question: string
    options?: string[]
    correctAnswer: string
    explanation: string
  }>
  userAnswers: Record<string, string>
  score: number
  totalQuestions: number
}

export default function HomePage() {
  const [currentState, setCurrentState] = useState<AppState>("upload")
  const [studyMaterial, setStudyMaterial] = useState<string>("")
  const [quizConfig, setQuizConfig] = useState({
    length: 10,
    difficulty: "medium" as "easy" | "medium" | "hard",
    questionTypes: ["multiple-choice"] as Array<"multiple-choice" | "true-false" | "short-answer">,
  })
  const [quizData, setQuizData] = useState<QuizData | null>(null)

  const handleMaterialUploaded = (material: string) => {
    setStudyMaterial(material)
    setCurrentState("configure")
  }

  const handleConfigurationComplete = (config: typeof quizConfig) => {
    setQuizConfig(config)
    setCurrentState("quiz")
  }

  const handleQuizComplete = (data: QuizData) => {
    setQuizData(data)
    setCurrentState("results")
  }

  const resetApp = () => {
    setCurrentState("upload")
    setStudyMaterial("")
    setQuizData(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Personal Knowledge Quiz Agent</h1>
              <p className="text-sm text-muted-foreground">Generate quizzes from your study materials using AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[
              { key: "upload", label: "Upload Material", icon: FileText },
              { key: "configure", label: "Configure Quiz", icon: BookOpen },
              { key: "quiz", label: "Take Quiz", icon: Brain },
              { key: "results", label: "View Results", icon: Trophy },
            ].map(({ key, label, icon: Icon }, index) => (
              <div key={key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 ${
                    currentState === key
                      ? "text-primary"
                      : ["upload", "configure", "quiz", "results"].indexOf(currentState) > index
                        ? "text-accent"
                        : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      currentState === key
                        ? "border-primary bg-primary text-primary-foreground"
                        : ["upload", "configure", "quiz", "results"].indexOf(currentState) > index
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
                {index < 3 && (
                  <div
                    className={`mx-4 h-px w-12 ${
                      ["upload", "configure", "quiz", "results"].indexOf(currentState) > index
                        ? "bg-accent"
                        : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentState === "upload" && (
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Upload Your Study Material</CardTitle>
                <CardDescription>
                  Upload PDF, DOCX, or TXT files, or paste your text directly to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onMaterialUploaded={handleMaterialUploaded} />
              </CardContent>
            </Card>
          </div>
        )}

        {currentState === "configure" && (
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Configure Your Quiz</CardTitle>
                <CardDescription>Customize the quiz length, difficulty, and question types</CardDescription>
              </CardHeader>
              <CardContent>
                <QuizConfiguration onConfigurationComplete={handleConfigurationComplete} initialConfig={quizConfig} />
              </CardContent>
            </Card>
          </div>
        )}

        {currentState === "quiz" && (
          <div className="mx-auto max-w-4xl">
            <QuizInterface studyMaterial={studyMaterial} config={quizConfig} onQuizComplete={handleQuizComplete} />
          </div>
        )}

        {currentState === "results" && quizData && (
          <div className="mx-auto max-w-4xl">
            <QuizResults quizData={quizData} onRestart={resetApp} />
          </div>
        )}
      </main>
    </div>
  )
}
