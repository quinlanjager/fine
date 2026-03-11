---
layout: layout.vto
title: fine — task management for agents
metas:
  site: fine documentation site
  twitter: "@quinlanjager"
  icon: /assets/logo.png
  lang: en
  image: /index.png
openGraphLayout: /layouts/og_images.jsx
---

The uncomplicated task management tool for agents.

**fine** gives your coding agent a simple way to track work. Tasks are plain markdown
files in a `tasks/` directory. They are meant to be managed solely by your agent.

Tasks generated with **fine** can be plugged into any workflow. Think of it as a way of
generating the raw input for your code factory.

Perfect for use with [pi](https://pi.dev/) and [ralphy](https://ralphy.goshen.fyi/).

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

**Complete a task:**

```
/complete-task 001
```

You can just reference the id of the task to have your agent complete it.

**Run a task with [Ralphy](https://ralphy.goshen.fyi/):**

Once you have a task, hand it off to Ralphy to execute the work:

```sh
ralphy --prd tasks/001-dark-mode-support.md
```

Ralphy reads the task, works through each step, and checks them off as it goes.
