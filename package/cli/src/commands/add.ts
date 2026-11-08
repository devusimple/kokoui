import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { resolveComponent } from "../registry/resolver.js";
import { DEFAULT_REGISTRY_URL } from "../registry/fetch.js";

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function add(
  names: string[],
  options: {
    cwd?: string;
    registry?: string;
    path?: string;
    overwrite?: boolean;
    dryRun?: boolean;
    yes?: boolean;
  } = {},
): Promise<void> {
  if (names.length === 0) {
    console.error("No components specified. Usage: rnative add <component...>");
    process.exitCode = 1;
    return;
  }

  const cwd = options.cwd ?? process.cwd();
  const base = options.registry ?? process.env.RNATIVE_REGISTRY_URL ?? DEFAULT_REGISTRY_URL;
  const componentsDir = options.path ?? "src/components";

  for (const name of names) {
    const { files, items } = await resolveComponent(name, { baseUrl: base, cwd, componentsDir, component: name });
    console.log(`Resolved ${name}: ${items.map((i) => i.name).join(", ")}`);
    for (const file of files) {
      const target = path.isAbsolute(file.targetPath)
        ? file.targetPath
        : path.join(cwd, file.targetPath);
      if (!options.overwrite && (await exists(target))) {
        console.log(`skip  ${path.relative(cwd, target)} (exists; use --overwrite)`);
        continue;
      }
      if (options.dryRun) {
        console.log(`would ${path.relative(cwd, target)}`);
        continue;
      }
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, file.content, "utf8");
      console.log(`write ${path.relative(cwd, target)}`);
    }
  }

  console.log("WIP: dependency installation is not implemented yet.");
}
