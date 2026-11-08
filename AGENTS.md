# AGENTS.md

## Project
- `rnative` (`package.json`): unfinished scaffold for a **shadcn-style React Native component library** (WIP). `private: true`, `version: 0.0.0`.
- `main`/`types` point to `src/index.ts` (no build output yet). `README.md` documents WIP status/TODOs. No CI, lint/format, or test setup.

## Layout
- `src/index.ts` - public exports (WIP)
- `src/components/` - components (e.g. `button.tsx` scaffold; exports via `components/index.ts`)
- `src/lib/utils.ts` - `cn` placeholder (styling/merge strategy TBD)
- `package/cli/` - WIP CLI (`commander`), own `tsconfig.json` (NodeNext, `src` → `dist`). Commands: `init`, `add`, `list`, `theme`; registry fetch/resolve helpers in `src/registry/`. Not wired as a workspace; deps may need install in `package/cli/`.
- `registry/` - registry data/source (separate from library `src/`); CLI default URL points at GitHub `DevUsimple/rnative/main/registry`. Root `tsconfig.json` typecheck is scoped to `src/` only. Confirm relationships before changing.

## Toolchain (verified)
- `package.json`: TypeScript 6, React 19, React Native 0.88 in devDeps; `dependencies` empty; `peerDependencies` `react >=18`, `react-native >=0.73` (provisional).
- `tsconfig.json`: strict; `module: "Preserve"`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `noEmit: true`, `allowImportingTsExtensions`, `verbatimModuleSyntax`, `skipLibCheck: true`, `include: ["src"]`.

## Commands
- `npm run typecheck` — `tsc --noEmit` for library (`src/` only; verified).
- `npm run cli:typecheck` — `tsc -p package/cli/tsconfig.json --noEmit` (CLI). No build/lint/test/format scripts yet; do not guess.

## Working guidance
- Treat this as unfinished scaffolding; confirm API/layout/build/peer-dep/styling decisions before large changes.
- Root typecheck targets `src/` only. `src/types/react-native.d.ts` is a **temporary** stub for local `tsc`; replace with proper React Native type resolution for real library/app use.
- Keep code compatible with React Native + the strict/bundler TS setup; prefer executable config/scripts as the source of truth.
