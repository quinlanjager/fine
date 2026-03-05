---
name: prd
description: Manage PRDs (Product Requirement Documents) using the fine CLI. Use this skill whenever the user asks to create, view, update, or work with PRDs, project requirements, feature specs, or task tracking through markdown files. Also use it when the user mentions "fine" in the context of project management, or asks about PRD status, task progress, or wants to break work into tracked tasks.
---

# PRD Management with Fine

Fine is an agent-first project management CLI. PRDs are markdown files in a `prds/` directory, managed via CLI commands and direct file editing.

## PRD file format

Each PRD is a markdown file named `NNN-slug.md` (e.g., `001-user-authentication.md`). The ID and slug come from the filename, not the content.

```markdown
# Title

Description paragraph(s).

## Tasks

- [ ] Incomplete task
- [x] Completed task
```

- **Title**: The first H1. Required.
- **Description**: Everything between the title and `## Tasks`. Can be multiple paragraphs.
- **Tasks**: Checklist items under `## Tasks`. Omit the section entirely if there are no tasks.

## CLI commands

Run commands with `fine <command>`.

### Create a PRD

```sh
fine create --title "Feature Name" --description "What this feature does and why"
```

This auto-assigns the next available ID and generates the slug from the title. Use descriptive titles that read well as filenames — "User Authentication" becomes `001-user-authentication.md`.

### List all PRDs

```sh
fine list
```

Shows each PRD with its ID, title, and task progress (completed/total). This is the default command — running `fine` with no arguments does the same thing.

### Show a PRD

```sh
fine show <id>
```

Accepts padded or unpadded IDs — both `1` and `001` work. Displays the full PRD content including description and all tasks with their completion status.

### Add a task

```sh
fine add-task <id> --task "Task description"
```

Appends a new incomplete task to the PRD. Tasks are always added as unchecked (`- [ ]`).

## Direct markdown editing

Some operations don't have CLI commands yet. Handle these by editing the PRD file directly.

### Complete a task

Open the file in `prds/` and change `[ ]` to `[x]`:

```
Before: - [ ] Implement login endpoint
After:  - [x] Implement login endpoint
```

### Remove a task

Delete the entire line (`- [ ] ...` or `- [x] ...`) from the Tasks section. If no tasks remain, remove the `## Tasks` heading and the blank line above it too, so the file stays clean.

### Edit the description

Modify the text between the `# Title` line and `## Tasks`. Keep at least one blank line after the title and before the tasks heading.

### Reorder tasks

Move the `- [ ]` / `- [x]` lines into the desired order. Each task is one line, so reordering is straightforward.

## Workflow

When asked to work with PRDs, follow this approach:

1. **Check what exists first.** Run `list` to see current PRDs before creating new ones — avoid duplicates.
2. **Create PRDs for distinct features**, not for individual tasks. A PRD represents a body of work; tasks go inside it.
3. **Break work into concrete tasks.** Each task should be a single deliverable action, not a vague goal. "Add login endpoint with JWT validation" is better than "Handle authentication."
4. **Mark tasks done as you complete them.** After finishing implementation work, edit the PRD markdown to check off the task. This keeps the PRD as the source of truth.
5. **Read the PRD before starting work.** Use `show` to review the full context and task list before diving into implementation.

## Typical agent session

Here's the natural flow for using fine as an agent:

```
User: "Create a PRD for adding dark mode support"

1. fine create --title "Dark Mode Support" --description "Add a dark/light theme toggle..."
2. fine add-task 1 --task "Define color tokens for both themes"
3. fine add-task 1 --task "Create ThemeProvider context"
4. fine add-task 1 --task "Add toggle component to header"
5. fine add-task 1 --task "Persist preference to localStorage"
```

```
User: "What's the status of our PRDs?"

1. fine list
   → Shows all PRDs with progress
2. fine show 1
   → Shows detail for any PRD that needs attention
```

```
User: "Mark the color tokens task as done"

1. Edit prds/001-dark-mode-support.md
   Change: - [ ] Define color tokens for both themes
   To:     - [x] Define color tokens for both themes
```
