export type PlaceSource = 'sample' | 'editorial' | 'google';

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  googlePlaceId?: string;
  source: PlaceSource;
  sourceLabel: string;
  verifiedAt?: string;
  photoAttribution?: string;
}
