import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { CatalogItem } from '../data/kolkataCatalog';

export function CatalogScreen({ title, subtitle, items, filterLabel }: { title: string; subtitle: string; items: CatalogItem[]; filterLabel?: string }) {
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('All');
  const filters = ['All',...Array.from(new Set(items.flatMap((item)=>item.tags))).slice(0,8)];
  const visible = items.filter((item)=>`${item.name} ${item.category} ${item.neighborhood} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (filter==='All'||item.tags.includes(filter)));
  return <ScrollView style={s.page} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
    <Link href="/" style={s.back}>‹  Home</Link><Text style={s.eyebrow}>AFRAZ KOLKATA</Text><Text style={s.title}>{title}</Text><Text style={s.subtitle}>{subtitle}</Text>
    <TextInput accessibilityLabel={`Search ${title}`} placeholder={filterLabel ?? `Search ${title.toLowerCase()}…`} placeholderTextColor="#718079" style={s.search} value={query} onChangeText={setQuery} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filters}>{filters.map((item)=><Text key={item} onPress={()=>setFilter(item)} style={[s.filter,filter===item&&s.activeFilter]}>{item}</Text>)}</ScrollView>
    <Text style={s.count}>{visible.length} DISCOVERIES · SOURCES SHOWN ON EACH CARD</Text>
    {visible.map((item,index)=><Link key={item.id} href={{pathname:'/places/[id]',params:{id:item.id}}} style={s.card}>
      <View style={[s.art,{backgroundColor:['#d9ede3','#f4e5c8','#e3e9f2','#f3dfda'][index%4]}]}><Text style={s.glyph}>{item.category.toLowerCase().includes('food')||item.tags.some(t=>['Biryani','Sweets','Rolls','Cafe','Chinese','Bakery'].includes(t))?'◉':item.category.toLowerCase().includes('market')||item.category.toLowerCase().includes('shopping')||item.category.toLowerCase().includes('book')?'⌑':'✦'}</Text></View>
      <View style={s.body}><Text style={s.category}>{item.category.toUpperCase()} · {item.neighborhood.toUpperCase()}</Text><Text style={s.name}>{item.name}</Text><Text style={s.description} numberOfLines={3}>{item.description}</Text><Text style={s.tagline}>{item.tags.join('  ·  ')}</Text><Text style={s.source}>ⓘ {item.source}</Text>{item.status?<Text style={s.status}>{item.status}</Text>:null}</View>
    </Link>)}
    {!visible.length?<View style={s.empty}><Text style={s.name}>No matches for this filter</Text><Text style={s.description}>Try a broader search or choose “All”.</Text></View>:null}
    <Text style={s.footer}>Prices, hours, stock and ratings are shown only when verified. Confirm details before travelling.</Text>
  </ScrollView>;
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#f7f8f4'},content:{padding:21,paddingTop:55,paddingBottom:38},back:{color:'#176b52',fontWeight:'700',marginBottom:22},eyebrow:{color:'#176b52',fontSize:10,fontWeight:'800',letterSpacing:1.6},title:{color:'#17231f',fontSize:32,fontWeight:'800',marginTop:7},subtitle:{color:'#65736d',fontSize:14,lineHeight:21,marginTop:7},search:{backgroundColor:'#fff',borderWidth:1,borderColor:'#e2e9e3',borderRadius:15,padding:15,marginTop:18,fontSize:15},filters:{marginTop:13,flexGrow:0},filter:{overflow:'hidden',backgroundColor:'#eaf0e9',color:'#375a4d',paddingHorizontal:13,paddingVertical:9,borderRadius:18,marginRight:7,fontSize:12,fontWeight:'700'},activeFilter:{backgroundColor:'#176b52',color:'#fff'},count:{fontSize:9,color:'#66756d',fontWeight:'800',letterSpacing:1,marginTop:22,marginBottom:10},card:{backgroundColor:'#fff',borderRadius:18,overflow:'hidden',marginBottom:13,borderWidth:1,borderColor:'#e8ece7'},art:{height:92,justifyContent:'center',alignItems:'center'},glyph:{fontSize:34,color:'#176b52'},body:{padding:14},category:{fontSize:9,color:'#176b52',fontWeight:'800',letterSpacing:.8},name:{fontSize:19,fontWeight:'800',color:'#17231f',marginTop:5},description:{fontSize:13,lineHeight:19,color:'#65736d',marginTop:6},tagline:{fontSize:11,color:'#315d4b',fontWeight:'700',marginTop:9},source:{fontSize:10,lineHeight:15,color:'#68766f',marginTop:10},status:{fontSize:11,lineHeight:16,color:'#80551d',marginTop:6},empty:{padding:18,backgroundColor:'#edf1e8',borderRadius:16,marginTop:12},footer:{color:'#748079',fontSize:11,lineHeight:17,textAlign:'center',marginTop:15}});
