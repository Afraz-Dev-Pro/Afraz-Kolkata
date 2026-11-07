import { CatalogScreen } from '../../src/components/CatalogScreen';
import { foodShops } from '../../src/data/kolkataCatalog';
export default function FoodScreen(){return <CatalogScreen title="Eat Kolkata" subtitle="A starting directory of food places, sweet shops and local dining districts." items={foodShops} filterLabel="Search dishes, shops or neighbourhoods…"/>;}
