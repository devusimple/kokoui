#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import { theme } from "./commands/theme.js";

const program = new Command();

program
  .name("rnative")
  .description("WIP CLI for rnative (shadcn-style React Native components)")
  .version("0.0.0")
  .showHelpAfterError();

program
  .command("init")
  .description("Initialize rnative config in a project (WIP)")
  .option("-c, --cwd <cwd>", "working directory", process.cwd())
  .option("-y, --yes", "skip confirmation prompts", false)
  .action(async (opts: { cwd: string; yes: boolean }) => {
    await init(opts);
  });

program
  .command("add")
  .description("Add components from the registry (WIP)")
  .argument("<components...>", "component names to add")
  .option("-c, --cwd <cwd>", "working directory", process.cwd())
  .option("-r, --registry <url>", "registry base URL")
  .option("-p, --path <path>", "components directory", "components")
  .option("-o, --overwrite", "overwrite existing files", false)
  .option("-n, --dry-run", "print planned writes without writing", false)
  .option("-y, --yes", "skip confirmation prompts", false)
  .action(async (components: string[], opts) => {
    await add(components, opts);
  });

program
  .command("list")
  .description("List available registry components")
  .option("-r, --registry <url>", "registry base URL")
  .option("--json", "output JSON", false)
  .action(async (opts: { registry?: string; json?: boolean }) => {
    await list(opts);
  });

program
  .command("theme")
  .description("Generate theme files (WIP)")
  .option("-c, --cwd <cwd>", "working directory", process.cwd())
  .action(async (opts: { cwd: string }) => {
    await theme(opts);
  });

program.parseAsync(process.argv).catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(message);
  process.exitCode = 1;
});
