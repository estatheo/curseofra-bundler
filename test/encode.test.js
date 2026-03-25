import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeToHieroglyphics } from '../src/index.js';

test('encodeToHieroglyphics emits only configured symbols', () => {
  const encoded = encodeToHieroglyphics('console.log(42);');
  assert.ok(encoded.length > 0);
  assert.match(encoded, /^[𓀀-𓀏]+$/u);
});
