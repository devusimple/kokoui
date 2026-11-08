# rnative (WIP)

Unfinished scaffold for a shadcn-style React Native component library.

## Status

- Work in progress; API and structure may change.
- No build/publish pipeline yet. `main`/`types` point at `src/index.ts` for local development.

## Structure

- `src/index.ts` - library entrypoint (public exports)
- `src/components/` - UI components (WIP)
- `src/lib/` - utilities (WIP)

## Development

```sh
npm run typecheck
```

## TODO

- [ ] Confirm package layout, entrypoints, and peer deps
- [ ] Choose styling/theming approach (NativeWind, StyleSheet, Unistyles, etc.)
- [ ] Implement shadcn-style variants/slots/composition
- [ ] Add example app
- [ ] Add build, lint, test, and CI
