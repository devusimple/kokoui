import process from "node:process";
import { fetchRegistryIndex, DEFAULT_REGISTRY_URL } from "../registry/fetch.js";

export async function list(options: { registry?: string; json?: boolean } = {}): Promise<void> {
  const base = options.registry ?? process.env.RNATIVE_REGISTRY_URL ?? DEFAULT_REGISTRY_URL;
  const index = await fetchRegistryIndex(base);
  const items = index.items ?? [];

  if (options.json) {
    console.log(JSON.stringify(items, null, 2));
    return;
  }

  if (items.length === 0) {
    console.log("No registry items found.");
    return;
  }

  for (const item of items) {
    const label = item.title ? `${item.name} - ${item.title}` : item.name;
    console.log(label);
    if (item.description) console.log(`  ${item.description}`);
  }
}
