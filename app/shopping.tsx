import { CatalogScreen } from '../src/components/CatalogScreen';
import { shoppingAreas } from '../src/data/kolkataCatalog';
export default function ShoppingScreen(){return <CatalogScreen title="Shopping Explorer" subtitle="Find Kolkata’s market districts and browse for products by category." items={shoppingAreas} filterLabel="Search product or market…"/>;}
