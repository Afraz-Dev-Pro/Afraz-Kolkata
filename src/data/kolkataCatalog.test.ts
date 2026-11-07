import assert from 'node:assert/strict';
import test from 'node:test';
import { busRoutes, foodShops, metroLines, nearbyFoodMap, placeBusStops, placeCosts, placeMetroAccess, places, searchCatalog } from './kolkataCatalog.ts';

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

test('every place and food listing has an attributed catalog or category image', () => {
  for (const item of [...places, ...foodShops]) {
    assert.ok(item.imageUrl, `${item.id} is missing an image URL`);
    assert.ok(item.imageAttribution, `${item.id} is missing visible image credit`);
    assert.ok(item.imageAttributionUrl, `${item.id} is missing a credit link`);
  }
});

test('nearby food and bus cross-links reference real catalog records', () => {
  for (const row of nearbyFoodMap) {
    assert.ok(places.some((place) => place.id === row.placeId));
    assert.ok(foodShops.some((food) => food.id === row.foodId));
  }
  for (const row of placeBusStops) {
    assert.ok(places.some((place) => place.id === row.placeId));
    assert.ok(busRoutes.some((route) => route.id === row.routeId));
    assert.ok(row.source && row.freshness && row.confidence);
  }
});

test('metro line details and verified cost records include provenance', () => {
  for (const line of metroLines) {
    assert.ok(line.allStations.length > 1);
    assert.ok(line.source && line.freshness);
  }
  for (const access of placeMetroAccess) assert.ok(access.source && access.freshness && access.note);
  for (const cost of placeCosts) {
    assert.ok(cost.source && cost.freshness && cost.lastVerified);
    assert.equal(cost.verificationState, 'verified');
  }
});
