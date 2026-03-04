#!/usr/bin/env node
import meow from "meow";
import run from "./app.ts";

const cli = meow(
	`
	Usage
	  $ fine <command> [options]

	Commands
	  create    Create a new PRD
	  list      List all PRDs (default)
	  show      Show a PRD by ID
	  add-task  Add a task to a PRD

	Options
	  --title, -t        PRD title (create)
	  --description, -d  PRD description (create)
	  --task             Task text (add-task)

	Examples
	  $ fine create --title "User Auth" --description "Auth system"
	  $ fine list
	  $ fine show 1
	  $ fine add-task 1 --task "Implement login"
`,
	{
		importMeta: import.meta,
		flags: {
			title: { type: "string", shortFlag: "t" },
			description: { type: "string", shortFlag: "d" },
			task: { type: "string" },
		},
	},
);

const command = cli.input[0] ?? "list";
const args = cli.input.slice(1);

const output = await run({ command, args, flags: cli.flags });
console.log(output);
