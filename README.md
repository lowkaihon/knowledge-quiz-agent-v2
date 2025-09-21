# Personal Knowledge Quiz


This is a **Personal Knowledge Quiz** web app with the following features:

**🎯Core Functionality**
- Users can upload study material (PDF, DOCX, TXT) or paste text directly.
- The app extracts text from the uploaded files or uses the pasted text directly.
- Use gpt-4o-mini via AI-SDK to process the content and generate quizzes.
- Support any combinations of question types:
  - Multiple-choice (with 1 correct answer + distractors)
  - True/False
  - Short answer (fill-in-the-blank)

**⚙️Customization**
- Allow users to:
  - Choose quiz length (# of questions).
  - Select difficulty level (easy, medium, hard).
  - Pick question type(s).

**🧑‍💻 Practice Mode**
- Users can take the generated quiz inside the app.
- After answering, show:
  - Correct answer
  - Explanation (from original notes as much as possible)
- Track results (score, % correct).


**🌐 UI / UX**
- Clean, minimal design (like Revisely and Quizlet).
- Minimalistic design:
  - No authentication required. Users can just start using the app.
  - No need for external database. Use local storage.

- Flow:
  1. Upload notes / paste text.
  2. onfigure quiz options.
  3. Take quiz.
  4. View results & feedback.


## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create `.env.local` file:

   ```bash
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
   ```

3. Start development:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to start using the Personal Knowledge Quiz web app.


# Development Notes
- Short answer (fill-in-the-blank) questions seem to only accept exact matches. May require LLM to evaluate these open-ended answers.
- Example PDF to use for quiz: https://53.fs1.hubspotusercontent-na1.net/hubfs/53/An_Introduction_to_JavaScript.pdf

