# Skill Name Generator

A lightweight web application that transforms a user‑defined goal into a ready‑to‑use AI skill definition. The tool outputs a structured JSON skill (including prompt and execution logic), auto‑generates test cases for validation, and provides a simple rating system to rank and filter generated skills.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Rating System](#rating-system)
- [Contributing](#contributing)
- [License](#license)

## Features
1. **Skill Generation** – Enter a natural‑language goal and receive a JSON skill object containing:
   - `prompt`: the instruction for the AI model
   - `executionLogic`: a JavaScript snippet that defines how the skill processes input and produces output
2. **Auto‑Generated Test Cases** – For each generated skill, the app creates a set of sample input/output pairs to quickly verify correctness.
3. **Rating & Filtering** – Users can up‑vote or down‑vote skills; the UI sorts and filters skills by rating to surface the best candidates.

## Tech Stack
- **HTML5** – Semantic markup for the UI
- **CSS3** – Custom styling (see `css/style.css`)
- **Vanilla JavaScript** – Application logic (`js/app.js`) and persistent storage helpers (`js/storage.js`)
- **LocalStorage** – Client‑side persistence of skills, test cases, and ratings

## Project Structure
```
skill_name/
├─ index.html          # Entry point – main UI
├─ css/
│  └─ style.css        # Stylesheet
├─ js/
│  ├─ app.js           # Core application logic
│  └─ storage.js       # Wrapper around localStorage
└─ README.md           # This file
```

## Installation
No build step is required. Simply clone or download the repository and open `index.html` in a modern browser.

```bash
git clone https://github.com/yourusername/skill_name.git
cd skill_name
# Open the file directly
open index.html   # macOS
# or
start index.html  # Windows
# or
xdg-open index.html # Linux
```

## Usage
1. **Define a Goal** – Type a concise description of what you want the AI skill to accomplish in the input field (e.g., “Summarize a news article in two sentences”).
2. **Generate Skill** – Click the **Generate** button. The app will:
   - Construct a prompt based on your goal.
   - Create a default execution logic stub (you can edit it in the preview pane).
   - Produce a JSON representation of the skill.
   - Auto‑generate a few test cases using heuristic input samples.
3. **Review & Edit** – Inspect the generated JSON, prompt, and test cases. Modify any field directly in the UI; changes are saved automatically.
4. **Rate the Skill** – Use the thumbs‑up / thumbs‑down buttons to give feedback. The skill’s rating is stored and influences the sorting order.
5. **Manage Skills** – All created skills appear in the skill list panel. You can filter by minimum rating, search by keyword, or delete unwanted entries.

## How It Works
- **Prompt Construction** – The app prepends a system‑level instruction (“You are a helpful AI that …”) to the user goal and wraps it in a JSON‑friendly string.
- **Execution Logic** – A basic template returns the model’s output unchanged. Advanced users can replace this with custom JavaScript that parses, transforms, or validates the model’s response.
- **Test Case Generation** – For simple text‑based goals, the app creates synthetic inputs by varying length, adding punctuation, or inserting placeholder entities. Expected outputs are derived by applying a naive rule (e.g., truncation for summarization) – users should replace these with accurate expectations.
- **Persistence** – Each skill object (including its prompt, execution logic, test cases, and rating) is stringified and saved under a UUID key in `localStorage`. The storage module provides `saveSkill`, `getAllSkills`, `updateSkill`, and `deleteSkill` helpers.

## Rating System
- Each skill starts with a neutral score of `0`.
- Clicking **👍** increments the score by `1`; clicking **👎** decrements it by `1`.
- The skill list is automatically re‑sorted descending by score after each vote.
- A filter input lets users display only skills with a score ≥ a chosen threshold (default shows all).

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-idea`).
3. Commit your changes (`git commit -m "Add awesome feature"`).
4. Push to the branch (`git push origin feature/awesome-idea`).
5. Open a Pull Request.

Ensure your code follows the existing style and includes appropriate comments.

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details (if present). Feel free to use, modify, and distribute the software as needed.