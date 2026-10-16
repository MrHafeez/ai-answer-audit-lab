import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENARIOS, evaluate } from './core.js';
test('every scenario has unique claims and usable answer explanations', () => {
  const claims = SCENARIOS.flatMap(s => s.claims);
  assert.equal(SCENARIOS.length, 3);
  assert.equal(claims.length, 9);
  assert.equal(new Set(claims.map(c => c.id)).size, 9);
  for (const claim of claims) {
    assert.ok(['supported','unsupported','qualified'].includes(claim.answer));
    assert.ok(claim.why.length > 50);
  }
});
test('answer evaluation distinguishes blank, correct and wrong selections', () => {
  const blank = evaluate(); assert.equal(blank.answered, 0); assert.equal(blank.correct, 0);
  const response = Object.fromEntries(SCENARIOS.flatMap(s => s.claims.map(c => [c.id, c.answer])));
  response['code-b'] = 'supported';
  const scored = evaluate(response); assert.equal(scored.answered, 9); assert.equal(scored.correct, 8);
  assert.equal(scored.items.find(i => i.id === 'code-b').correct, false);
});
