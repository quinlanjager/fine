---
layout: layout.vto
title: fine — task management for agents
---

# fine

The uncomplicated task management tool for agents.

Fine gives your coding agent a simple way to track work. Tasks are plain markdown
files in a `tasks/` directory. They are meant to be managed solely by your agent.

## Install

```bash
npx skills add quinlanjager/fine
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
ralphy --prd tasks/001-dark-mode-support.md
```

Ralphy reads the task, works through each step, and checks them off as it goes.
