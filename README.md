# for-hannah

A cozy reviewer site for Hannah: a "hi, hannah!" home page with one folder per subject.
Each folder opens a two-column reviewer: a sidebar (greeting, live stats, sections, other folders)
and a main pane for study cards or the active quiz question.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page: greeting, doodles, rotating notes, folder shelf |
| `reviewer.html` | The reviewer page; loads a subject with `reviewer.html?s=<id>` |
| `assets/reviewer.js` | Quiz engine: MCQ, Morse type, identification, true/false, stats, filters |
| `assets/reviewer.css` | Reviewer layout (sidebar + pane, phone drawer) and quiz styles |
| `assets/base.css`, `assets/folders.css`, `assets/common.js` | Shared theme, folder patterns, storage + dark mode |
| `subjects/subjects.js` | The list of folders (title, folder pattern, doodle, optional data parts) |
| `subjects/pcol1.js`, `subjects/pcol2.js` | Subject data with study cards and quizzes |
| `subjects/cp1.js` | CP1 folder: joins the three topic files into one quiz-only subject |
| `subjects/cp1/acid-base.js`, `aki.js`, `ckd.js` | CP1 question banks, 100 questions each (MCQ + Morse type) |
| `for-hannah.html` | Old link; redirects to the PCOL 1 folder |

## Question formats (subject data)

```js
// Multiple choice: the first option is the correct one (options are shuffled on screen)
["section", "Question?", ["correct", "wrong", "wrong", "wrong"], "Explanation"]

// Morse type: two statements, fixed choices
// A = 1 true, 2 false · B = 1 false, 2 true · C = both true · D = both false
["section", "morse", "Statement 1", "Statement 2", "TF" | "FT" | "TT" | "FF", "Explanation"]
```

## Adding a subject

1. Create `subjects/<id>.js` with the same shape as an existing subject
   (`TOPICS`, `MCQ`, optional `MCQ_SETS`, optional `studyHTML`/`FLIPS`/`PEARLS`).
   Large question banks can live in separate files listed under `parts` in `subjects/subjects.js`.
2. Add an entry for it in `subjects/subjects.js`, picking a folder pattern and doodle.
3. Push to `main`; Vercel redeploys automatically.

Progress (mastered questions, missed questions, best scores, accuracy and streak) is saved
per subject in each visitor's browser.
