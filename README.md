# Personal Knowledge Quiz


This is a **Personal Knowledge Quiz Agent** web app with the following features:

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


