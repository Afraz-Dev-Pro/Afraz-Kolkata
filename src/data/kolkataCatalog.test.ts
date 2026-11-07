import assert from 'node:assert/strict';
import test from 'node:test';
import { foodShops, places, searchCatalog } from './kolkataCatalog.ts';

test('broad food search opens the complete offline food directory', () => {
  const results = searchCatalog('food');
  assert.equal(results.food.length, foodShops.length);
  assert.ok(results.food.length > 0);
  assert.equal(results.places.length, 0);
});

test('Find food near me search opens food listings without claiming location', () => {
  assert.equal(searchCatalog('food near me').food.length, foodShops.length);
});

test('place search still matches a specific landmark', () => {
  const results = searchCatalog('Victoria Memorial');
  assert.equal(results.places.length, 1);
  assert.equal(results.places[0]?.name, places[0]?.name);
});
