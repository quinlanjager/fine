---
name: task
description: Manage tasks using the fine CLI. Use this skill whenever the user asks to create, view, update, or work with tasks, project requirements, feature specs, or work tracking through markdown files. Also use it when the user mentions "fine" in the context of project management, or asks about task status, step progress, or wants to break work into tracked steps.
---

# Task Management with Fine

Fine is an agent-first project management CLI. Tasks are markdown files in a `tasks/` directory, managed via CLI commands and direct file editing.

## Task file format

Each task is a markdown file named `NNN-slug.md` (e.g., `001-user-authentication.md`). The ID and slug come from the filename, not the content.

```markdown
# Title

Description paragraph(s).

## Steps

- [ ] Incomplete step
- [x] Completed step
```

- **Title**: The first H1. Required.
- **Description**: Everything between the title and `## Steps`. Can be multiple paragraphs.
- **Steps**: Checklist items under `## Steps`. Omit the section entirely if there are no steps.

## CLI commands

Run commands with `npx @jagersoftware/fine <command>`.

### Create a task

```sh
npx @jagersoftware/fine create --title "Feature Name" --description "What this feature does and why"
```

This auto-assigns the next available ID and generates the slug from the title. Use descriptive titles that read well as filenames — "User Authentication" becomes `001-user-authentication.md`.

### List all tasks

```sh
npx @jagersoftware/fine list
```

Shows each task with its ID, title, and step progress (completed/total). This is the default command — running `fine` with no arguments does the same thing.

### Show a task

```sh
npx @jagersoftware/fine show <id>
```

Accepts padded or unpadded IDs — both `1` and `001` work. Displays the full task content including description and all steps with their completion status.

### Add a step

```sh
npx @jagersoftware/fine add-step <id> --step "Step description"
```

Appends a new incomplete step to the task. Steps are always added as unchecked (`- [ ]`).

## Direct markdown editing

Some operations don't have CLI commands yet. Handle these by editing the task file directly.

### Complete a step

Open the file in `tasks/` and change `[ ]` to `[x]`:

```
Before: - [ ] Implement login endpoint
After:  - [x] Implement login endpoint
```

### Remove a step

Delete the entire line (`- [ ]` or `- [x]`) from the Steps section. If no steps remain, remove the `## Steps` heading and the blank line above it too, so the file stays clean.

### Edit the description

Modify the text between the `# Title` line and `## Steps`. Keep at least one blank line after the title and before the steps heading.

### Reorder steps

Move the `- [ ]` / `- [x]` lines into the desired order. Each step is one line, so reordering is straightforward.

## Workflow

When asked to work with tasks, follow this approach:

1. **Check what exists first.** Run `list` to see current tasks before creating new ones — avoid duplicates.
2. **Create tasks for distinct features**, not for individual steps. A task represents a body of work; steps go inside it.
3. **Break work into concrete steps.** Each step should be a single deliverable action, not a vague goal. "Add login endpoint with JWT validation" is better than "Handle authentication."
4. **Do NOT perform the work.** This skill is for task management only — creating, viewing, updating, and organizing tasks. After creating or updating a task, summarize what was created/changed and stop. Do not start implementing the steps.
5. **Summarize when done.** After creating a task or making changes, give a brief summary of the task (title, description, steps) so the user can confirm it looks right.

## Typical agent session

Here's the natural flow for using fine as an agent. Note: always stop after the task management action and summarize — never start implementing the work.

```
User: "Create a task for adding dark mode support"

1. npx @jagersoftware/fine create --title "Dark Mode Support" --description "Add a dark/light theme toggle..."
2. npx @jagersoftware/fine add-step 1 --step "Define color tokens for both themes"
3. npx @jagersoftware/fine add-step 1 --step "Create ThemeProvider context"
4. npx @jagersoftware/fine add-step 1 --step "Add toggle component to header"
5. npx @jagersoftware/fine add-step 1 --step "Persist preference to localStorage"
6. Summarize: "Created task 001 — Dark Mode Support with 4 steps: ..."
   STOP here. Do not begin implementing the steps.
```

```
User: "What's the status of our tasks?"

1. npx @jagersoftware/fine list
   → Shows all tasks with progress
2. npx @jagersoftware/fine show 1
   → Shows detail for any task that needs attention
3. Summarize the current status for the user. Do not start working on incomplete steps.
```

```
User: "Mark the color tokens step as done"

1. Edit tasks/001-dark-mode-support.md
   Change: - [ ] Define color tokens for both themes
   To:     - [x] Define color tokens for both themes
2. Summarize: "Marked 'Define color tokens for both themes' as complete."
   STOP here.
```
