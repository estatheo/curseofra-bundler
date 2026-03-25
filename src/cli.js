#!/usr/bin/env node
import { transpileDistToHieroglyphics } from './index.js';

const distArg = process.argv[2];

transpileDistToHieroglyphics({
  distDir: distArg,
  banner: '𓂀 Produced by @curseofra/hieroglyphic-dist'
}).then((result) => {
  console.log(`Transpiled ${result.filesProcessed.length} file(s) to hieroglyphics.`);
}).catch((error) => {
  console.error('Failed to transpile dist output:', error);
  process.exitCode = 1;
});
