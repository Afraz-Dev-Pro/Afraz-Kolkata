export function googleMapsDirectionsUrl(input: {
  latitude: number;
  longitude: number;
  placeId?: string;
  name: string;
}): string {
  const params = new URLSearchParams({
    api: '1',
    destination: `${input.latitude},${input.longitude}`,
    travelmode: 'transit',
  });
  if (input.placeId) params.set('destination_place_id', input.placeId);
  else params.set('destination', input.name);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
