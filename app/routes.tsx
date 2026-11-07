import { CatalogScreen } from '../src/components/CatalogScreen';
import { busRoutes } from '../src/data/kolkataCatalog';
export default function RoutesScreen(){return <CatalogScreen title="Getting around" subtitle="Official WBTC route listings. This directory does not provide live tracking, current timetables or fares." items={busRoutes} filterLabel="Search route number, stop or area…"/>;}
