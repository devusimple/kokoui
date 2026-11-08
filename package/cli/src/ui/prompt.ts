import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export function isCancel(value: unknown): value is symbol {
  return typeof value === "symbol";
}

export async function confirm(opts: { message: string }): Promise<boolean | symbol> {
  // Minimal confirm prompt (WIP). Avoids external deps in this scaffold.
  if (!input.isTTY) return true;
  const rl = createInterface({ input, output });
  try {
    const answer = (await rl.question(`${opts.message} [y/N] `)).trim().toLowerCase();
    return answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}
