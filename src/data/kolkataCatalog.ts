export type CatalogItem = { id: string; name: string; category: string; neighborhood: string; description: string; address?: string; source: string; tags: string[]; status?: string };

const tourism = 'Incredible India, Kolkata city guide (checked 4 Nov 2026)';
const shoppingSource = 'Incredible India West Bengal destination guide; market specialties are discovery leads, not verified price claims (checked 4 Nov 2026)';

export const places: CatalogItem[] = [
  ['victoria-memorial','Victoria Memorial','Historical landmark','Maidan','Marble museum and memorial set within landscaped grounds.','Victoria Memorial, 1 Queen’s Way','Landmark, Museum'],
  ['howrah-bridge','Howrah Bridge','Landmark','Howrah / Burrabazar','Iconic cantilever bridge spanning the Hooghly River.','Howrah Bridge','Landmark, River'],
  ['maidan','The Maidan','Park and open space','Maidan','Kolkata’s expansive central urban green and recreation space.','Maidan, Kolkata','Park, Outdoors'],
  ['kumartuli','Kumartuli','Heritage neighbourhood','North Kolkata','Traditional potters’ quarter known for clay image-making.','Kumartuli, Kolkata','Culture, Crafts'],
  ['indian-museum','Indian Museum','Museum','New Market','Major national museum with collections spanning art, archaeology and natural history.','27 Jawaharlal Nehru Road','Museum, History','Temporary closure notice reported for 2026; check official visitor notice before visiting'],
  ['jorasanko','Jorasanko Thakur Bari','Historic house','Jorasanko','Ancestral home of the Tagore family and a cultural landmark.','Jorasanko, Kolkata','History, Culture'],
  ['belur-math','Belur Math','Religious and cultural site','Belur','Ramakrishna Math and Mission headquarters on the Hooghly riverbank.','Belur Math, Howrah','Heritage, Riverside'],
  ['dakshineswar','Dakshineswar Kali Temple','Religious site','Dakshineswar','Historic riverside Kali temple complex in north Kolkata.','Dakshineswar, Kolkata','Temple, Heritage'],
  ['science-city','Science City','Science museum','East Kolkata','Interactive science centre and family-oriented visitor attraction.','JBS Haldane Avenue','Family, Museum'],
  ['prinsep-ghat','Prinsep Ghat','Riverside landmark','Maidan','Riverside promenade and historic Palladian porch beside the Hooghly.','Strand Road, Kolkata','Riverside, Outdoors'],
  ['park-street','Park Street','Dining and culture district','Park Street','Central Kolkata avenue known for restaurants, cafes and nightlife.','Park Street, Kolkata','Dining, Shopping'],
  ['indian-coffee-house','College Street Coffee House','Cafe and cultural landmark','College Street','Historic meeting place associated with Kolkata’s College Street book district.','15 Bankim Chatterjee Street','Cafe, Heritage'],
  ['kalighat','Kalighat Temple','Religious site','Kalighat','Historic Kali temple and one of the city’s best-known pilgrimage sites.','Kalighat, Kolkata','Temple, Heritage'],
  ['town-hall','Kolkata Town Hall','Historic building','BBD Bagh','Neoclassical civic landmark in central Kolkata.','Mayo Road, Kolkata','History, Architecture'],
  ['new-market','New Market','Historic market','Dharmatala','Large historic covered market with a broad mix of retail categories.','Bertram Street, Kolkata','Market, Shopping'],
  ['college-street','College Street','Book district','College Street','Kolkata’s celebrated book-shopping street and academic neighbourhood.','College Street, Kolkata','Books, Heritage'],
  ['st-pauls','St. Paul’s Cathedral','Religious and historic site','Maidan','Gothic Revival cathedral near the Maidan.','1A Cathedral Road','Architecture, Heritage'],
  ['alipore-zoo','Alipore Zoological Gardens','Zoo and family attraction','Alipore','Historic zoological garden in south Kolkata.','Alipore Road, Kolkata','Family, Outdoors'],
  ['eco-park','Eco Park','Park','New Town','Large urban park with themed areas and outdoor recreation.','Major Arterial Road, New Town','Family, Outdoors'],
  ['rabindra-sarobar','Rabindra Sarobar','Lake and park','Dhakuria','Urban lake and open space used for walking and recreation.','Southern Avenue, Kolkata','Park, Outdoors'],
].map(([id,name,category,neighborhood,description,address,tags,status]) => ({ id,name,category,neighborhood,description,address,source:tourism,tags:tags.split(', '),...(status?{status}:{}) }));

export const foodShops: CatalogItem[] = [
  ['arsalan','Arsalan','Biryani and Mughlai','Park Circus','Known for Kolkata-style biryani; check outlet and current menu before visiting.','Incredible India food guide','Biryani, Mughlai'],
  ['aminia','Aminia','Biryani and Mughlai','New Market','Kolkata restaurant name featured for biryani and firni.','Incredible India food guide','Biryani, Mughlai'],
  ['royal-indian','Royal Indian Hotel','Awadhi and Mughlai','Chitpur','Historic restaurant at 147 Rabindra Sarani, noted for slow-cooked meat dishes.','Incredible India food guide','Mughlai, Heritage'],
  ['flurys','Flurys','Bakery and cafe','Park Street','Long-running Park Street tearoom and bakery at 18 Park Street.','Incredible India food guide','Bakery, Cafe'],
  ['peter-cat','Peter Cat','Restaurant','Park Street','Park Street restaurant at 18A Park Street.','Incredible India food guide','Restaurant, Park Street'],
  ['mocambo','Mocambo','Restaurant','Park Street','Park Street restaurant at 25B Park Street.','Incredible India food guide','Restaurant, Park Street'],
  ['trincas','Trincas','Restaurant and live music','Park Street','Park Street dining institution at 17 Park Street.','Incredible India food guide','Restaurant, Park Street'],
  ['nizams','Nizam’s','Rolls and Mughlai','New Market','Kolkata food guide lists this New Market area eatery among notable local food stops.','Incredible India food guide','Rolls, Mughlai'],
  ['kusum-rolls','Kusum Rolls','Kathi rolls','Park Street','Roll shop at 21 Park Street, featured in the city food guide.','Incredible India food guide','Rolls, Street food'],
  ['coffee-house','Indian Coffee House','Cafe','College Street','Historic cafe at 15 Bankim Chatterjee Street.','Incredible India food guide','Cafe, College Street'],
  ['golden-joy','Golden Joy','Chinese restaurant','Tangra','Tangra Chinese restaurant named in the city food guide.','Incredible India food guide','Chinese, Tangra'],
  ['beijing-tangra','Beijing','Chinese restaurant','Tangra','Tangra Chinese restaurant named in the city food guide.','Incredible India food guide','Chinese, Tangra'],
  ['bar-b-q','Bar-B-Q','Restaurant','Park Street','Park Street restaurant at 43/47/55 Park Street, as listed by the city food guide.','Incredible India food guide','Restaurant, Park Street'],
  ['nalin-chandra','Nalin Chandra Das & Sons','Sweet shop','North Kolkata','Traditional Bengali sweet-maker named in the city food guide; confirm current outlet.','Incredible India food guide','Sweets, Bengali'],
  ['nakur','Girish Chandra Dey & Nakur Chandra Nandy','Sweet shop','North Kolkata','North Kolkata sweet shop named in the city food guide.','Incredible India food guide','Sweets, Bengali'],
  ['balaram','Balaram Mullick & Radharaman Mullick','Sweet shop','South Kolkata','Bengali sweet-shop name featured in the city food guide; confirm branch.','Incredible India food guide','Sweets, Bengali'],
  ['sen-mahasay','Sen Mahasay','Sweet shop','Kolkata','Traditional sweet-shop name included in the city food guide; confirm current outlet.','Incredible India food guide','Sweets, Bengali'],
  ['mitra-cafe','Mitra Cafe','Cafe and snacks','North Kolkata','Long-running north Kolkata cafe noted in the city food guide.','Incredible India food guide','Cafe, Snacks'],
  ['park-street-food','Park Street dining','Dining district','Park Street','Explore a cluster of established Kolkata restaurants along Park Street.','Incredible India food guide','Dining, Restaurants'],
  ['tangra-food','Tangra Chinese dining','Dining district','Tangra','Explore Kolkata’s historic Chinese dining district; confirm individual venue details.','Incredible India food guide','Chinese, Restaurants'],
].map(([id,name,category,neighborhood,description,source,tags]) => ({ id,name,category,neighborhood,description,source:`${source} (checked 4 Nov 2026)`,tags:tags.split(', '), status:'Current prices, hours, availability and ratings are not supplied; verify with the shop.' }));

export const shoppingAreas: CatalogItem[] = [
  ['gariahat','Gariahat Market','Street market','Gariahat','South Kolkata shopping district. Explore sarees, clothing, accessories and household shopping; category fit is a discovery lead, not a current shop inventory.','Clothing, Sarees, Handloom, Accessories, Homeware'],
  ['hatibagan','Hatibagan Market','Street market','Shyambazar','North Kolkata market district for browsing clothing and everyday retail. Product assortment varies by shop.','Clothing, Footwear, Accessories, Household'],
  ['new-market-shopping','New Market','Historic covered market','Dharmatala','Central market with broad retail variety across clothing, accessories, footwear and other goods.','Clothing, Footwear, Bags, Cosmetics, Gifts, Food'],
  ['burrabazar','Burrabazar','Wholesale district','Burrabazar','Large central trading district; wholesale availability and minimum quantities vary by shop and must be confirmed.','Wholesale, Fabrics, Clothing, Homeware, Gifts'],
  ['college-street-shopping','College Street book market','Book market','College Street','Book district with academic, second-hand and general book browsing.','Books, Academic books, Second-hand books, Stationery'],
  ['dakshinapan','Dakshinapan Shopping Centre','Shopping centre','Dhakuria','Shopping complex associated with handloom, handicrafts and state emporium browsing. Confirm individual shop stock.','Handloom, Sarees, Handicrafts, Gifts'],
  ['bowbazar','Bowbazar','Retail district','Bowbazar','Central Kolkata shopping area; individual product specialities and current shops require verification.','Jewellery, Clothing, Accessories'],
  ['shyambazar','Shyambazar market area','Market district','Shyambazar','North Kolkata commercial district with neighbourhood retail and market streets.','Clothing, Household, Food'],
  ['esplanade','Esplanade and Dharmatala','Retail district','Esplanade','Central Kolkata shopping and transit district with market streets and retail clusters.','Clothing, Footwear, Electronics, Gifts'],
  ['lake-market','Lake Market','Neighbourhood market','Kalighat','South Kolkata neighbourhood market for daily needs and local shopping. Verify speciality at shop level.','Groceries, Clothing, Household, Food'],
].map(([id,name,category,neighborhood,description,categories]) => ({ id,name,category,neighborhood,description,source:shoppingSource,tags:categories.split(', '),status:'No recent comparable seller prices, live stock or verified opening hours in this offline catalogue.' }));

export const busRoutes: CatalogItem[] = [
  {id:'wbtc-s45',name:'S-45 · Sakuntala Park ↔ Kolkata Station',category:'WBTC bus route',neighborhood:'Kolkata',description:'Official WBTC route listing. Published stops include Park Street, Esplanade and Sealdah. Check the operator for current service before travel.',source:'WBTC official route listing (checked 4 Nov 2026)',tags:['Bus','Park Street','Esplanade','Sealdah'],status:'Official listing; no live tracking, timetable or fare supplied.'},
  {id:'wbtc-v1',name:'V1 · Tollygunge ↔ Airport',category:'WBTC bus route',neighborhood:'Kolkata',description:'Route endpoints listed by WBTC. Current service and stop sequence should be confirmed with the operator.',source:'WBTC official route listing (checked 4 Nov 2026)',tags:['Bus','Tollygunge','Airport'],status:'Official listing; no live tracking, timetable or fare supplied.'},
  {id:'wbtc-s5c',name:'S-5C · Nayabad ↔ Howrah',category:'WBTC bus route',neighborhood:'Kolkata',description:'Route endpoints listed by WBTC. Confirm current service and stops before boarding.',source:'WBTC official route listing (checked 4 Nov 2026)',tags:['Bus','Nayabad','Howrah'],status:'Official listing; no live tracking, timetable or fare supplied.'},
  {id:'wbtc-s24',name:'S-24 · Kamalgazi ↔ Howrah',category:'WBTC bus route',neighborhood:'Kolkata',description:'Route endpoints listed by WBTC. Confirm current service and stops before boarding.',source:'WBTC official route listing (checked 4 Nov 2026)',tags:['Bus','Kamalgazi','Howrah'],status:'Official listing; no live tracking, timetable or fare supplied.'},
  {id:'wbtc-s22',name:'S-22 · Karunamoyee ↔ Sakuntala Park',category:'WBTC bus route',neighborhood:'Kolkata',description:'Route endpoints listed by WBTC. Confirm current service and stops before boarding.',source:'WBTC official route listing (checked 4 Nov 2026)',tags:['Bus','Karunamoyee','Sakuntala Park'],status:'Official listing; no live tracking, timetable or fare supplied.'},
];

export const shoppingCategories = ['Sarees','Bengali handloom','Kurtis','Salwar suits','Western wear','Dresses and tops','Jeans and trousers','Blouses','Fabrics','Women’s footwear','Handbags','Jewellery','Artificial jewellery','Cosmetics','Fashion accessories','Shirts','T-shirts','Formal wear','Panjabi and kurta','Suits','Shoes','Watches','Kids’ clothes','School uniforms','Toys','School bags','Mobile phones','Mobile accessories','Computers and laptops','Electrical equipment','Academic books','Second-hand books','Fiction','Stationery','Furniture','Home decoration','Kitchenware','Gifts','Handicrafts','Wedding shopping','Puja shopping','Sports equipment','Travel accessories','Leather products','Speciality food'];

export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  const match = (item: CatalogItem) => !q || `${item.name} ${item.category} ${item.neighborhood} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(q);
  // Treat broad module names as navigation intent. A search for "food" should
  // open the food directory even though individual listings are named by shop.
  const aliases: Record<string, CatalogItem[]> = {
    food: foodShops, foods: foodShops, restaurant: foodShops, restaurants: foodShops,
    eat: foodShops, eating: foodShops, dish: foodShops, dishes: foodShops,
    place: places, places, landmark: places, landmarks: places, attraction: places, attractions: places,
    shopping: shoppingAreas, market: shoppingAreas, markets: shoppingAreas,
    route: busRoutes, routes: busRoutes, bus: busRoutes, buses: busRoutes, transport: busRoutes,
  };
  const aliasKey = q === 'food near me' ? 'food' : q === 'bus route' ? 'bus' : q;
  const aliasItems = aliases[aliasKey];
  return {
    places: aliasItems ? (aliasItems === places ? places : []) : places.filter(match),
    food: aliasItems ? (aliasItems === foodShops ? foodShops : []) : foodShops.filter(match),
    shopping: aliasItems ? (aliasItems === shoppingAreas ? shoppingAreas : []) : shoppingAreas.filter(match),
    routes: aliasItems ? (aliasItems === busRoutes ? busRoutes : []) : busRoutes.filter(match),
  };
}

export function findItem(id: string) { return [...places,...foodShops,...shoppingAreas,...busRoutes].find((item) => item.id === id); }
