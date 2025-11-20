# Personal Portfolio Website for Ng'or Kon

This repository contains the source code for my personal portfolio website, built as a "Professional Competency Platform" to showcase my skills in Physics, Chemistry, Computer Science, and Engineering.

The site is designed to be interactive, performant, and easily updatable with new projects and case studies.

---

## Project Structure

The repository in a structure to keep it clean 

```
mywebsite/
├── assets/              # All static assets (CSS, JS, images, 3D models)
│   ├── css/
│   ├── js/
│   ├── images/
│   └── models/
│
├── projects/            # All individual project case study pages
│   └── project-template.html
│
├── index.html           # The main landing page
└── README.md            # This guide
```

---

## How to Add a New Project Case Study

Follow these steps to add a new project to the portfolio.

### Step 1: Create the Project File

1.  In the `/projects` directory, make a **copy** of `project-template.html`.
2.  **Rename** the copied file to match your new project (e.g., `my-new-project.html`). Use lowercase and hyphens for the file name.

### Step 2: Customize the Project Content

Open your new HTML file (`my-new-project.html`) and update the following sections:

-   **`<title>`**: Change the page title in the `<head>`.
-   **Header (`.project-header`)**:
    -   Update the `<h1>` with your project's title.
    -   Update the `<p>` with the one-line summary.
    -   Fill out the `.specs-box` with the correct Role, Tech Stack, etc.
-   **A.R.C. Tabs:**
    -   **Approach Tab:** Update the problem statement and the `vis-timeline` data in the JavaScript section at the bottom of the file if needed.
    -   **Realization Tab:** Update the code snippets in the `<pre><code class="language-cpp">...</code></pre>` blocks. Make sure to specify the correct language for syntax highlighting (e.g., `language-python`).
    -   **Conclusion Tab:** Update the "Stat Cards" and your personal reflection.

### Step 3: Link from the Main Page

1.  Open `index.html` at the root of the project.
2.  Find the `.projects` section.
3.  Copy an existing `.project-card` block and paste it to create a new card.
4.  Update the content of the new card (title, description, tags).
5.  **Crucially, update the link** at the bottom of the card to point to your new project file:

    ```html
    <!-- Example link for your new project card -->
    <a href="projects/my-new-project.html" class="full-case-study-link">View Full Case Study &rarr;</a>
    ```

### Step 4: Commit and Push

Commit the new project file and the updated `index.html` to your GitHub repository. The changes will go live automatically.
