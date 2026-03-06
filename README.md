# fine

The uncomplicated task management tool for agents.

Fine gives your coding agent a simple way to track work. Tasks are plain markdown
files in a `tasks/` directory. They are meant to be managed solely by your agent.

## Install

```bash
npx skills add quinlanjager/fine
```

Once installed, your agent can create tasks, break work into steps, and track progress
as part of its normal workflow.

## Commands

### `fine create`

Create a new task.

```sh
fine create --title "Dark Mode Support" --description "Add a dark/light theme toggle"
```

| Flag | Short | Description |
|------|-------|-------------|
| `--title` | `-t` | Task title (required) |
| `--description` | `-d` | Task description |

Creates a numbered markdown file in `tasks/` (e.g. `tasks/001-dark-mode-support.md`).

### `fine list`

List all tasks with step progress. This is the default command when running `fine` with no arguments.

```sh
fine list
```

### `fine show <id>`

Show a task's full detail — title, description, and steps.

```sh
fine show 1
```

### `fine add-step <id>`

Add a step to an existing task.

```sh
fine add-step 1 --step "Define color tokens for both themes"
fine add-step 1 --step "Create ThemeProvider context"
```

| Flag | Short | Description |
|------|-------|-------------|
| `--step` | | Step text (required) |

## Task file format

Tasks are markdown files with a title, description, and a steps section:

```markdown
# Dark Mode Support

Add a dark/light theme toggle to the app.

## Steps

- [ ] Define color tokens for both themes
- [x] Create ThemeProvider context
- [ ] Add toggle component to header
```

Steps are standard markdown checkboxes. Mark them done by changing `[ ]` to `[x]`.

## Examples

**Generate a task:**

```
/task Create a task for adding dark mode support to our app
```

Claude will create a structured task in your `tasks/` directory with steps ready to work on.

**Run a task with [Ralphy](https://ralphy.goshen.fyi/):**

Once you have a task, hand it off to Ralphy to execute the work:

```sh
ralphy --task tasks/001-dark-mode-support.md
```

Ralphy reads the task, works through each step, and checks them off as it goes.
