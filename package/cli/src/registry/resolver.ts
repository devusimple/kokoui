// Resolve registry dependencies and target file paths (WIP).

import type { RegistryItem } from "./fetch.js";
import { fetchRegistryItemWithFiles } from "./fetch.js";

export type ResolvedFile = {
  sourcePath: string;
  targetPath: string;
  content: string;
  type: string;
  component: string;
};

export type ResolveOptions = {
  baseUrl?: string;
  cwd?: string;
  componentsDir?: string;
};

function normalizeComponentsDir(dir: string): string {
  return dir.replace(/\\/g, "/").replace(/\/+$/, "");
}

function defaultTargetPath(filePath: string, componentsDir: string): string {
  // registry paths like "ui/button/button.tsx" -> <componentsDir>/ui/button/button.tsx
  return `${normalizeComponentsDir(componentsDir)}/${filePath.replace(/^\/+/, "")}`;
}

export async function resolveComponent(
  name: string,
  options: ResolveOptions = {},
): Promise<{ items: RegistryItem[]; files: ResolvedFile[] }> {
  const seen = new Set<string>();
  const items: RegistryItem[] = [];
  const files: ResolvedFile[] = [];
  const componentsDir = options.componentsDir ?? "components";

  async function visit(componentName: string): Promise<void> {
    if (seen.has(componentName)) return;
    seen.add(componentName);

    const item = await fetchRegistryItemWithFiles(componentName, options.baseUrl);
    for (const dep of item.registryDependencies ?? []) {
      await visit(dep);
    }
    items.push(item);
    for (const file of item.files) {
      files.push({
        sourcePath: file.path,
        targetPath: file.target ?? defaultTargetPath(file.path, componentsDir),
        content: file.content,
        type: file.type,
        component: componentName,
      });
    }
  }

  await visit(name);
  return { items, files };
}
