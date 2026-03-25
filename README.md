# @curseofra/hieroglyphic-dist

An npm library that can be used in JavaScript/TypeScript projects (including React and Vue apps) to rewrite build artifacts in `dist/` into Egyptian hieroglyphics.

## What it does

- Converts textual files (default: `.js`, `.mjs`, `.cjs`, `.css`, `.html`) to hieroglyphic glyphs.
- For JavaScript bundle files, emits a hieroglyphic payload plus a tiny decoder stub so runtime behavior still works.
- Works as a direct API call, CLI command, or Vite plugin.

> Note: JavaScript keywords (`const`, `for`, `eval`, etc.) must remain plain text for engines to execute code. So JS output is mostly hieroglyphics plus a minimal decoder wrapper.

## Install

```bash
npm install @curseofra/hieroglyphic-dist
```

## API usage

```ts
import { transpileDistToHieroglyphics } from '@curseofra/hieroglyphic-dist';

await transpileDistToHieroglyphics({ distDir: 'dist' });
```

## Vite usage (React or Vue)

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteHieroglyphicsPlugin } from '@curseofra/hieroglyphic-dist';

export default defineConfig({
  plugins: [
    react(),
    viteHieroglyphicsPlugin()
  ]
});
```

For Vue, replace `react()` with `vue()`; the hieroglyphics plugin usage is identical.

## CLI usage

```bash
npx hiero-dist dist
```

## Development

```bash
npm test
```
