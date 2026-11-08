// TODO: add clsx/tailwind-merge equivalent for React Native (e.g. nativewind/twrnc/cva)
// WIP: placeholder utility for composing class/style names.

export type ClassValue = string | undefined | null | false | 0 | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  // TODO: implement proper merge/dedupe for the chosen styling approach
  return inputs
    .flat()
    .filter((x): x is string => typeof x === "string" && x.length > 0)
    .join(" ");
}
