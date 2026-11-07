import test from 'node:test';
import assert from 'node:assert/strict';
import { googleMapsDirectionsUrl } from './googleMapsUrl.ts';

test('directions URL uses Google Maps URL API and coordinates', () => {
  const url = new URL(googleMapsDirectionsUrl({ name: 'Sample place', latitude: 22.5, longitude: 88.3 }));
  assert.equal(url.searchParams.get('api'), '1');
  assert.equal(url.searchParams.get('destination'), 'Sample place');
  assert.equal(url.searchParams.get('travelmode'), 'transit');
});

test('directions URL carries a Place ID when provided', () => {
  const url = new URL(googleMapsDirectionsUrl({ name: 'Sample place', latitude: 22.5, longitude: 88.3, placeId: 'place-id-123' }));
  assert.equal(url.searchParams.get('destination_place_id'), 'place-id-123');
  assert.equal(url.searchParams.get('destination'), '22.5,88.3');
});
