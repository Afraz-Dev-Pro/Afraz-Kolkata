import { useLocalSearchParams } from 'expo-router';
import { CatalogScreen } from '../src/components/CatalogScreen';
import { searchCatalog } from '../src/data/kolkataCatalog';
export default function SearchScreen(){const {q=''}=useLocalSearchParams<{q?:string}>();const query=Array.isArray(q)?q[0]:q;const found=searchCatalog(query);const items=[...found.places,...found.food,...found.shopping,...found.routes];return <CatalogScreen title={query?`Results for “${query}”`:'Explore Kolkata'} subtitle={`${found.places.length} places · ${found.food.length} food listings · ${found.shopping.length} markets · ${found.routes.length} bus routes`} items={items} filterLabel="Refine search…"/>;}
