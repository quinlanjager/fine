# fine

The uncomplicated task management tool for agents.

Fine gives your coding agent a simple way to track work. Tasks are plain markdown files in a `tasks/` directory -- no databases, no dashboards, just files your agent can read and write.

## Install

```bash
npx skills add quinlanjager/fine
```

This installs the `task` skill for Claude Code. Once installed, your agent can create tasks, break work into steps, and track progress as part of its normal workflow.

## What your agent can do

**Create a task** when starting a new feature:

```sh
fine create --title "Dark Mode Support" --description "Add a dark/light theme toggle"
```

**Break it into steps:**

```sh
fine add-step 1 --step "Define color tokens for both themes"
fine add-step 1 --step "Create ThemeProvider context"
fine add-step 1 --step "Add toggle component to header"
```

**Check progress:**

```sh
fine list        # overview of all tasks with step progress
fine show 1      # full detail on a specific task
```

**Mark steps done** by editing the markdown directly:

```diff
- - [ ] Define color tokens for both themes
+ - [x] Define color tokens for both themes
```

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
