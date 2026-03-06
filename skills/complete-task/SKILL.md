---
name: complete-task
description: Complete a task by working through its steps. Use this skill when the user asks to complete, work on, implement, or pick up a task — i.e., do the actual work described in a task's steps and mark them done.
---

# Completing a Task

Work through a task's steps one at a time, doing the implementation work and marking each step done.

## Workflow

1. **Review the task.** Run `npx @jagersoftware/fine show <id>` to see the full task with its description and steps. Read the description carefully — it provides context for all the steps.

2. **Find the next incomplete step.** Look for the first unchecked step (`- [ ]`). Work through steps in order unless there's a clear reason to skip ahead.

3. **Implement the step.** Do the actual work — write code, create files, run commands, whatever the step requires. Each step should be a concrete deliverable, so focus on completing it fully before moving on.

4. **Mark the step complete.** Edit the task file in `tasks/` to check off the step:

   ```
   Before: - [ ] Implement login endpoint
   After:  - [x] Implement login endpoint
   ```

5. **Repeat.** Go back to step 2 until all steps are checked off.

6. **Confirm completion.** Run `npx @jagersoftware/fine list` to verify the task shows full progress (e.g., `[5/5]`).

## Guidelines

- **One step at a time.** Finish and mark each step before starting the next. This keeps the task file as an accurate record of progress.
- **Read before you code.** If a step involves modifying existing code, read the relevant files first to understand what's there.
- **Test your work.** After implementing a step, run relevant tests (`bun test`) to make sure nothing is broken before marking it done.
- **Don't skip the description.** The task description often contains important constraints or context that individual steps don't repeat.
- **Ask if a step is unclear.** If a step's intent is ambiguous, ask the user rather than guessing.

## Typical session

```
User: "Work on task 3"

1. npx @jagersoftware/fine show 3
   → Review title, description, and steps
2. Read the first unchecked step: "Add validation to signup form"
3. Read the relevant source files
4. Implement the validation logic
5. Run tests to verify
6. Edit tasks/003-signup-form.md: change [ ] to [x] for that step
7. Move to the next unchecked step
8. ... repeat until all steps are done ...
9. npx @jagersoftware/fine list → confirm [4/4] or similar
```
