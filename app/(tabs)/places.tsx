import { CatalogScreen } from '../../src/components/CatalogScreen';
import { places } from '../../src/data/kolkataCatalog';
export default function PlacesScreen(){return <CatalogScreen title="Places to explore" subtitle="Landmarks, heritage, gardens, museums and local neighbourhoods." items={places}/>;}
