# fine

The uncomplicated task management tool for agents.

Fine gives your coding agent a simple way to track work. PRDs (Product Requirement Documents) are plain markdown files in a `prds/` directory -- no databases, no dashboards, just files your agent can read and write.

## Install

```bash
npx skills add quinlanjager/fine
```

This installs the `prd` skill for Claude Code. Once installed, your agent can create PRDs, break work into tasks, and track progress as part of its normal workflow.

## What your agent can do

**Create a PRD** when starting a new feature:

```sh
fine create --title "Dark Mode Support" --description "Add a dark/light theme toggle"
```

**Break it into tasks:**

```sh
fine add-task 1 --task "Define color tokens for both themes"
fine add-task 1 --task "Create ThemeProvider context"
fine add-task 1 --task "Add toggle component to header"
```

**Check progress:**

```sh
fine list        # overview of all PRDs with task progress
fine show 1      # full detail on a specific PRD
```

**Mark tasks done** by editing the markdown directly:

```diff
- - [ ] Define color tokens for both themes
+ - [x] Define color tokens for both themes
```

## PRD format

Each PRD is a markdown file named `NNN-slug.md`. The files are the source of truth.

```markdown
# Dark Mode Support

Add a dark/light theme toggle with persistent user preference.

## Tasks

- [x] Define color tokens for both themes
- [ ] Create ThemeProvider context
- [ ] Add toggle component to header
```

## License

MIT
