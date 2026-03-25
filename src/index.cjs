'use strict';

const { promises: fs } = require('node:fs');
const path = require('node:path');

const HIEROGLYPHIC_ALPHABET = [
  '𓀀', '𓀁', '𓀂', '𓀃', '𓀄', '𓀅', '𓀆', '𓀇',
  '𓀈', '𓀉', '𓀊', '𓀋', '𓀌', '𓀍', '𓀎', '𓀏'
];

async function transpileDistToHieroglyphics(options = {}) {
  const distDir = path.resolve(options.distDir ?? 'dist');
  const includeExtensions = new Set(options.includeExtensions ?? ['js', 'mjs', 'cjs', 'css', 'html']);
  const files = await collectFiles(distDir);
  const filesProcessed = [];

  for (const file of files) {
    const ext = path.extname(file).slice(1);
    if (!includeExtensions.has(ext)) continue;

    const raw = await fs.readFile(file, 'utf8');
    const encoded = encodeToHieroglyphics(raw);
    const output = ext === 'js' || ext === 'mjs' || ext === 'cjs'
      ? buildRuntimeDecoder(encoded, options.banner)
      : encoded;

    await fs.writeFile(file, output, 'utf8');
    filesProcessed.push(file);
  }

  return { filesProcessed };
}

function viteHieroglyphicsPlugin(options = {}) {
  return {
    name: 'vite-hieroglyphics-dist',
    apply: 'build',
    async closeBundle() {
      await transpileDistToHieroglyphics(options);
    }
  };
}

function encodeToHieroglyphics(content) {
  const bytes = new TextEncoder().encode(content);
  let out = '';

  for (const byte of bytes) {
    out += HIEROGLYPHIC_ALPHABET[byte >> 4];
    out += HIEROGLYPHIC_ALPHABET[byte & 0x0f];
  }

  return out;
}

async function collectFiles(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const all = [];

  for (const entry of entries) {
    const absolutePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      all.push(...await collectFiles(absolutePath));
      continue;
    }
    all.push(absolutePath);
  }

  return all;
}

function buildRuntimeDecoder(encoded, banner) {
  const bannerLine = banner ? `/* ${banner} */\n` : '';

  return `${bannerLine}const 𓋹='${HIEROGLYPHIC_ALPHABET.join('')}';\nconst 𓂀='${encoded}';\nconst 𓐍=new Uint8Array(𓂀.length/2);\nfor(let 𓆣=0;𓆣<𓂀.length;𓆣+=2){\n  const 𓄿=𓋹.indexOf(𓂀[𓆣]);\n  const 𓎛=𓋹.indexOf(𓂀[𓆣+1]);\n  𓐍[𓆣/2]=(𓄿<<4)|𓎛;\n}\n(0,eval)(new TextDecoder().decode(𓐍));\n`;
}

module.exports = {
  transpileDistToHieroglyphics,
  viteHieroglyphicsPlugin,
  encodeToHieroglyphics
};
