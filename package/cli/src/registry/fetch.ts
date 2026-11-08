// Registry fetching helpers (WIP).

export const DEFAULT_REGISTRY_URL =
  "https://raw.githubusercontent.com/DevUsimple/rnative/main/registry";

export type RegistryFile = {
  path: string;
  type: string;
  target?: string;
  content?: string;
};

export type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
};

export type RegistryIndex = {
  $schema?: string;
  name?: string;
  homepage?: string;
  items?: Array<Pick<RegistryItem, "name" | "type" | "title" | "description" | "files">>;
};

function url(base: string, path: string): string {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function fetchText(source: string): Promise<string> {
  const res = await fetch(source);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${source}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

async function fetchJson<T>(source: string): Promise<T> {
  return JSON.parse(await fetchText(source)) as T;
}

export async function fetchRegistryIndex(base = DEFAULT_REGISTRY_URL): Promise<RegistryIndex> {
  return await fetchJson<RegistryIndex>(url(base, "registry.json"));
}

export async function fetchRegistryItem(name: string, base = DEFAULT_REGISTRY_URL): Promise<RegistryItem> {
  return await fetchJson<RegistryItem>(url(base, `ui/${name}/registry-item.json`));
}

export async function fetchRegistryFile(filePath: string, base = DEFAULT_REGISTRY_URL): Promise<string> {
  return await fetchText(url(base, filePath));
}

export async function fetchRegistryItemWithFiles(
  name: string,
  base = DEFAULT_REGISTRY_URL,
): Promise<RegistryItem & { files: Array<RegistryFile & { content: string }> }> {
  const item = await fetchRegistryItem(name, base);
  const files = await Promise.all(
    (item.files ?? []).map(async (file) => ({
      ...file,
      content: file.content ?? (await fetchRegistryFile(file.path, base)),
    })),
  );
  return { ...item, files };
}
