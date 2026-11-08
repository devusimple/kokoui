import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { confirm, isCancel } from "../ui/prompt.js";

type InitConfig = {
  $schema?: string;
  style: "default";
  rsc: false;
  tsx: true;
  aliases: {
    components: string;
    utils: string;
  };
  registry: string;
};

const DEFAULT_CONFIG: InitConfig = {
  $schema: "https://rnative.dev/schema.json",
  style: "default",
  rsc: false,
  tsx: true,
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
  },
  registry: "https://raw.githubusercontent.com/devusimple/rnative-dev/main/registry",
};

export async function init(options: { cwd?: string; yes?: boolean } = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  const configPath = path.join(cwd, "components.json");

  let existing = false;
  try {
    await readFile(configPath, "utf8");
    existing = true;
  } catch {
    existing = false;
  }

  if (!options.yes) {
    const proceed = await confirm({
      message: existing
        ? "`components.json` already exists. Overwrite it?"
        : "Initialize rnative in this project? (creates components.json)",
    });
    if (isCancel(proceed) || !proceed) {
      console.error("Operation cancelled");
      process.exitCode = 1;
      return;
    }
  }

  const config = { ...DEFAULT_CONFIG };
  await mkdir(cwd, { recursive: true });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  console.log(`Created ${path.relative(cwd, configPath) || "components.json"}`);
  console.log("WIP: init only writes config; project aliases and utils are not scaffolded yet.");
}
