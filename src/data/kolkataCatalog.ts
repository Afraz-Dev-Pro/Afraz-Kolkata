export type CatalogItem = { id: string; name: string; category: string; neighborhood: string; description: string; address?: string; source: string; tags: string[]; status?: string; imageUrl?: string; imageAttribution?: string; imageAttributionUrl?: string };

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

export type MetroLineInfo = { lineId: string; lineName: string; lineColor: string; allStations: string[]; serviceNote?: string; source: string; freshness: string };
export const metroLines: MetroLineInfo[] = [
  { lineId:'blue-line',lineName:'Blue Line · North–South',lineColor:'#2196F3',allStations:['Dakshineswar','Baranagar','Noapara','Dum Dum','Belgachia','Shyambazar','Shobhabazar Sutanuti','Girish Park','Mahatma Gandhi Road','Central','Chandni Chowk','Esplanade','Park Street','Maidan','Rabindra Sadan','Netaji Bhavan','Jatin Das Park','Kalighat','Rabindra Sarobar','Mahanayak Uttam Kumar','Netaji','Masterda Surya Sen','Gitanjali','Kavi Nazrul','Shahid Khudiram','Kavi Subhash'],serviceNote:'Metro Railway listed Blue Line commercial services as suspended south of Shahid Khudiram in its 11 Sep 2026 service notice. Confirm current operations before travel.',source:'Metro Railway Kolkata official line and service information · https://mtp.indianrailways.gov.in/offerings/schemes-and-services/preview/128',freshness:'Reviewed 11 Sep 2026' },
  { lineId:'green-line',lineName:'Green Line · East–West',lineColor:'#4CAF50',allStations:['Howrah Maidan','Howrah','Mahakaran','Esplanade','Sealdah','Phool Bagan','Salt Lake Stadium','Bengal Chemical','City Centre','Central Park','Karunamoyee','Salt Lake Sector V'],source:'Kolkata Metro Rail Corporation station list · https://www.kmrc.in/stations.php',freshness:'Checked 7 Nov 2026' },
  { lineId:'purple-line',lineName:'Purple Line · Joka–Majerhat',lineColor:'#9C27B0',allStations:['Joka','Thakurpukur','Sakher Bazar','Behala Chowrasta','Behala Bazar','Taratala','Majerhat'],serviceNote:'This is the published operating section; the Esplanade extension is not presented as open service.',source:'Metro Railway Kolkata official network information · https://mtp.indianrailways.gov.in/ministry/about-us',freshness:'Checked 7 Nov 2026' },
  { lineId:'orange-line',lineName:'Orange Line · Kavi Subhash–Beleghata',lineColor:'#FF9800',allStations:['Kavi Subhash','Satyajit Ray','Jyotirindra Nandi','Kavi Sukanta','Hemanta Mukhopadhyay','VIP Bazar','Ritwik Ghatak','Barun Sengupta','Beleghata'],source:'Metro Railway Kolkata official service page · https://mtp.indianrailways.gov.in/offerings/schemes-and-services/preview/131',freshness:'Reviewed 25 May 2026' },
  { lineId:'yellow-line',lineName:'Yellow Line · Noapara–Jai Hind Bimanbandar',lineColor:'#E8B51D',allStations:['Noapara','Dum Dum Cantonment','Jessore Road','Jai Hind Bimanbandar'],source:'Metro Railway Kolkata official network information · https://mtp.indianrailways.gov.in/offerings/schemes-and-services/view/113',freshness:'Reviewed 11 Sep 2026' },
];

export type PlaceMetroAccess = { placeId: string; lineId: string; stationName: string; walkingMinutes?: number; direction?: string; note: string; source: string; freshness: string; confidence: 'high' | 'medium' | 'low' };
// Only exact destination/area-to-station name matches are listed; these do not imply a nearest entrance or walk duration.
export const placeMetroAccess: PlaceMetroAccess[] = [
  ...[['dakshineswar','Dakshineswar'],['maidan','Maidan'],['park-street','Park Street'],['kalighat','Kalighat'],['rabindra-sarobar','Rabindra Sarobar']].map(([placeId,stationName])=>({placeId,stationName,lineId:'blue-line',note:'The station shares the destination or area name. Walking distance to the entrance has not been verified.',source:'Metro Railway Kolkata official Blue Line information · https://mtp.indianrailways.gov.in/offerings/schemes-and-services/preview/128',freshness:'Reviewed 11 Sep 2026',confidence:'medium' as const})),
];

export type PlaceBusAccess = { placeId: string; routeId: string; nearestStop?: string; keyStops?: string[]; note: string; source: string; freshness: string; confidence: 'high' | 'medium' | 'low' };
// Match only route tags that explicitly name the catalog destination or its neighborhood.
export const placeBusStops: PlaceBusAccess[] = places.flatMap((place)=>busRoutes.filter((route)=>route.tags.some((tag)=>tag.toLowerCase()===place.name.toLowerCase()||tag.toLowerCase()===place.neighborhood.toLowerCase())).map((route)=>({placeId:place.id,routeId:route.id,note:'This official route listing names the destination or area; its nearest stop and current service have not been confirmed.',source:route.source,freshness:'Checked 4 Nov 2026',confidence:'medium' as const})));

export type NearbyFood = { placeId: string; foodId: string; distanceNote: string; speciality: string };
const foodMatchesByPlace: Record<string, string[]> = {
  'park-street':['flurys','peter-cat','mocambo','trincas','kusum-rolls','bar-b-q'],
  'college-street':['coffee-house'],
  'indian-coffee-house':['coffee-house'],
  'new-market':['aminia','nizams'],
};
export const nearbyFoodMap: NearbyFood[] = Object.entries(foodMatchesByPlace).flatMap(([placeId, foodIds]) => foodIds.flatMap((foodId) => {
  const food = foodShops.find((item) => item.id === foodId);
  return food ? [{ placeId, foodId, distanceNote: 'Same named district; walking distance not verified.', speciality: food.tags.slice(0, 2).join(' · ') }] : [];
}));

export type PlaceCost = { placeId: string; entryFee?: string; cameraFee?: string; avgCostPerPerson?: string; breakdown?: string[]; lastVerified?: string; disclaimer: string; source?: string; freshness?: string; confidence: 'high' | 'medium' | 'low'; verificationState: 'verified' | 'unverified' };
// Intentionally empty until venue-published prices can be checked. Do not fill with illustrative prices.
export const placeCosts: PlaceCost[] = [
  {placeId:'victoria-memorial',entryFee:'Museum galleries: Indian nationals ₹50; SAARC nationals ₹100; other foreign nationals ₹500. Garden: ₹30 per person per entry.',breakdown:['Museum galleries: 10:00 AM–6:00 PM; closed Mondays and designated national holidays.','Gardens: 6:00 AM–6:00 PM; open daily.','Ticket counters close 30 minutes before closing.'],lastVerified:'7 Nov 2026',disclaimer:'Officially published rates and hours; confirm the venue notice before visiting. No total trip-cost estimate is available.',source:'Victoria Memorial Hall · https://victoriamemorial-cal.org/visit-us/',freshness:'Official visitor page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
  {placeId:'indian-museum',entryFee:'Adult ₹75; under 18 ₹20; foreign nationals ₹500. Organised school groups up to Class XII: free (conditions apply).',cameraFee:'Smartphone photography ₹50; DSLR ₹100; listed photography rates incur 18% GST.',breakdown:['Official visitor page states the galleries will remain closed to the public during 2026.','Usual visitor hours listed: Tuesday–Sunday, 10:00 AM–6:00 PM; Mondays closed.'],lastVerified:'7 Nov 2026',disclaimer:'The official page reports a 2026 gallery closure. Confirm reopening and current charges before planning a visit.',source:'Indian Museum Visitor Information · https://indianmuseumkolkata.org/visitors-information/',freshness:'Official visitor page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
  {placeId:'alipore-zoo',entryFee:'Up to age 5: ₹20; visitors above age 5: ₹50.',breakdown:['Video photography: ₹250.','Zoo grounds: 9:00 AM–5:00 PM; ticket counters close 4:30 PM.','Aquarium: 10:30 AM–4:30 PM; separate fee applies.','Weekly closure is Thursday, with a holiday exception and alternate closure rule.'],lastVerified:'7 Nov 2026',disclaimer:'Official fee and hours page; check the zoo’s current notices for holiday changes and aquarium tickets.',source:'Zoological Garden, Alipore · https://kolkatazoo.in/web/fee-zoo-hours.php',freshness:'Official fee page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
  {placeId:'science-city',breakdown:['Fulldome 3D Digital Theatre general visitor ticket: ₹150 per person.','This is a separate show ticket; the cited source does not state a general site-entry total.'],lastVerified:'7 Nov 2026',disclaimer:'Only the cited 3D show rate is included. Check official online ticketing for current site admission and other activities.',source:'Science City Kolkata · https://sciencecitykolkata.org.in/tickets-rates/',freshness:'Official ticket page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
];

export type QuickFacts = { timeNeeded?: string; bestTimeToVisit?: string; bestSeason?: string; closedOn?: string; photography?: string; howToReach?: string; source?: string; freshness?: string; confidence: 'high' | 'medium' | 'low'; verificationState: 'verified' | 'unverified' };
export const placeQuickFacts: Record<string, QuickFacts> = {
  'victoria-memorial':{closedOn:'Museum galleries: Mondays and listed national holidays. Gardens: open daily.',source:'Victoria Memorial Hall · https://victoriamemorial-cal.org/visit-us/',freshness:'Official visitor page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
  'indian-museum':{closedOn:'Mondays; official page also says galleries remain closed to the public during 2026.',source:'Indian Museum · https://indianmuseumkolkata.org/visitors-information/',freshness:'Official visitor page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
  'alipore-zoo':{closedOn:'Usually Thursday; the official holiday exception shifts weekly closure to the next working day.',source:'Zoological Garden, Alipore · https://kolkatazoo.in/web/fee-zoo-hours.php',freshness:'Official fee page checked 7 Nov 2026',confidence:'high',verificationState:'verified'},
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;
const media: Record<string, { imageUrl: string; imageAttribution: string; imageAttributionUrl: string }> = {
  'victoria-memorial': { imageUrl: unsplash('photo-1666876419569-bd714131b4c1'), imageAttribution: 'Photo by Yan Chakraborty on Unsplash · landmark image', imageAttributionUrl: 'https://unsplash.com/photos/a-large-white-building-with-a-dome-and-many-trees-in-front-of-it-with-victoria-memorial-hall-in-the-background-vQz3piNND1I' },
  'howrah-bridge': { imageUrl: unsplash('photo-1742325646212-f917ba1feeaa'), imageAttribution: 'Photo by Paras Verma on Unsplash · landmark image', imageAttributionUrl: 'https://unsplash.com/photos/the-howrah-bridge-stands-beautifully-in-the-dusk-KucspYX1Ft0' },
};
const foodCategoryImage = { imageUrl: unsplash('photo-1546069901-ba9599a7e63c'), imageAttribution: 'Category illustration by Anh Nguyen on Unsplash · not a photo of this venue or its dishes', imageAttributionUrl: 'https://unsplash.com/photos/vegetable-and-meat-on-bowl-kcA-c3f_3FE' };
const parkCategoryImage = { imageUrl: unsplash('photo-1756970959936-b935d7725314'), imageAttribution: 'Category illustration by Dhiraj Dey on Unsplash · not a photo of this exact park', imageAttributionUrl: 'https://unsplash.com/photos/lush-green-field-with-distant-buildings-under-trees-ziBdlHAwYPU' };
const templePhoto = { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Dakshineswar_Kali_temple%2C_Kolkata%2C_West_Bengal%2C_India.JPG', imageAttribution: 'Photo by Kundansonuj · Wikimedia Commons · CC BY-SA 3.0 · unchanged', imageAttributionUrl: 'https://commons.wikimedia.org/wiki/File:Dakshineswar_Kali_temple,_Kolkata,_West_Bengal,_India.JPG' };
const landmarkCategoryImage = { imageUrl: unsplash('photo-1666876419569-bd714131b4c1'), imageAttribution: 'Kolkata landmark category illustration by Yan Chakraborty on Unsplash · not this venue', imageAttributionUrl: 'https://unsplash.com/photos/a-large-white-building-with-a-dome-and-many-trees-in-front-of-it-with-victoria-memorial-hall-in-the-background-vQz3piNND1I' };
for (const item of places) {
  const image = media[item.id] ?? (item.category.toLowerCase().includes('temple') ? templePhoto : /park|lake|outdoors|riverside|open space/i.test(`${item.category} ${item.tags.join(' ')}`) ? parkCategoryImage : landmarkCategoryImage);
  Object.assign(item, image);
}
for (const item of foodShops) Object.assign(item, media[item.id] ?? foodCategoryImage);

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
