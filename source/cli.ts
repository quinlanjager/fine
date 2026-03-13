#!/usr/bin/env node
import meow from "meow";
import run from "./app.ts";

const cli = meow(
  `
	Usage
	  $ fine <command> [options]

	Commands
	  create    Create a new task
	  list      List all tasks (default)
	  show      Show a task by ID
	  add-step  Add a step to a task

	Options
	  --help, -h         Show help
	  --title, -t        Task title (create)
	  --description, -d  Task description (create)
	  --step             Step text (add-step)

	Examples
	  $ fine create --title "Dark Mode Support" --description "Add a dark/light theme toggle"
	  $ fine add-step 1 --step "Define color tokens for both themes"
	  $ fine add-step 1 --step "Create ThemeProvider context"
	  $ fine add-step 1 --step "Add toggle component to header"
	  $ fine list
	  $ fine show 1
`,
  {
    importMeta: import.meta,
    autoHelp: false,
    flags: {
      help: { type: "boolean", shortFlag: "h" },
      title: { type: "string", shortFlag: "t" },
      description: { type: "string", shortFlag: "d" },
      step: { type: "string" },
    },
  },
);

if (cli.flags.help || cli.flags.h) {
  cli.showHelp();
}

const command = cli.input[0] ?? "list";
const args = cli.input.slice(1);

const output = await run({ command, args, flags: cli.flags });
console.log(output);
