import chalk from "chalk";
import create from "./commands/create.ts";
import list from "./commands/list.ts";
import show from "./commands/show.ts";
import addStepCommand from "./commands/add-step.ts";

interface RunOptions {
  command: string;
  args: string[];
  flags: {
    title?: string;
    description?: string;
    step?: string;
  };
}

export default async function run(
  { command, args, flags }: RunOptions,
): Promise<string> {
  switch (command) {
    case "create":
      return create({ title: flags.title, description: flags.description });
    case "list":
      return list();
    case "show":
      return show({ id: args[0] });
    case "add-step":
      return addStepCommand({ id: args[0], step: flags.step });
    default:
      return chalk.red(
        `Unknown command: ${command}. Run \`fine --help\` for usage.`,
      );
  }
}
