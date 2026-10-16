# AI Answer Audit Lab

A static, interactive classroom prototype that asks learners to judge nine AI-generated claims across fictional MBA analytics, training evaluation and Python examples. The exercise uses prewritten cases and does **not** call a language model. It stores no answers, requires no account and accepts no uploads.

Run `npm test` for structural and scoring checks. Serve locally with any static web server (for example `python -m http.server 8790`), then visit `http://127.0.0.1:8790/`. The ES module may not run from a `file://` URL.

For static hosting copy `index.html`, `styles.css`, `app.js` and `core.js` to `/ai-answer-audit-lab/`. The same files can be published via GitHub Pages. Update canonical/links if using another public URL.

The fictional cases are teaching material, not a claim that the prototype uses AI or measures professional competence. Answers and explanations should be reviewed when adapting the content for a real client context.
