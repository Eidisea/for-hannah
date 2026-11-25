# for-hannah

A cozy reviewer site for Hannah: a "hi, hannah!" home page with one folder per subject.
Each folder opens study cards plus a practice quiz (MCQ, Identification, True/False).

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page: greeting, doodles, rotating notes, folder shelf |
| `reviewer.html` | The reviewer page; loads a subject with `reviewer.html?s=<id>` |
| `subjects/subjects.js` | The list of folders (title, folder pattern, doodle) |
| `subjects/<id>.js` | One subject's content: topics, study cards, questions |
| `assets/` | Shared styles and scripts |
| `for-hannah.html` | Old link; redirects to the PCOL 1 folder |

## Adding a subject

1. Create `subjects/<id>.js` with the same shape as `subjects/pcol1.js`
   (`TOPICS`, `MCQ`, `IDQ`, `TFQ`, `FLIPS`, `PEARLS`, `studyHTML`).
2. Add an entry for it in `subjects/subjects.js`, picking a folder pattern and doodle.
3. Push to `main`; Vercel redeploys automatically.

Progress is saved per subject in each visitor's browser.
