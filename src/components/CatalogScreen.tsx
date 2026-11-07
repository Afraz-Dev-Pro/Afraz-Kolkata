import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { CatalogItem } from '../data/kolkataCatalog';
import { useFavorites } from '../providers/FavoritesProvider';
import { useAppTheme } from '../theme/ThemeProvider';

export function CatalogScreen({ title, subtitle, items, filterLabel }: { title: string; subtitle: string; items: CatalogItem[]; filterLabel?: string }) {
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('All');
  const { colors } = useAppTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const filters = ['All',...Array.from(new Set(items.flatMap((item)=>item.tags))).slice(0,8)];
  const visible = items.filter((item)=>`${item.name} ${item.category} ${item.neighborhood} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (filter==='All'||item.tags.includes(filter)));
  return <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <Link href="/" style={styles.back}>‹  Home</Link><Text style={styles.eyebrow}>AFRAZ KOLKATA</Text><Text style={styles.title}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text>
    <TextInput accessibilityLabel={`Search ${title}`} placeholder={filterLabel ?? `Search ${title.toLowerCase()}…`} placeholderTextColor={colors.textMuted} style={styles.search} value={query} onChangeText={setQuery} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>{filters.map((item)=><Pressable accessibilityRole="button" accessibilityState={{selected:filter===item}} key={item} onPress={()=>setFilter(item)} style={[styles.filter,filter===item&&styles.activeFilter]}><Text style={[styles.filterText,filter===item&&styles.activeFilterText]}>{item}</Text></Pressable>)}</ScrollView>
    <Text style={styles.count}>{visible.length} DISCOVERIES · SOURCES SHOWN ON EACH CARD</Text>
    {visible.map((item,index)=><View key={item.id} style={styles.card}>
      <Link href={{pathname:'/places/[id]',params:{id:item.id}}} asChild><Pressable accessibilityRole="link" accessibilityLabel={`Open ${item.name} details`}>
        <View style={[styles.art,{backgroundColor:[colors.placeCard,colors.foodCard,colors.routeCard,colors.shoppingCard][index%4]}]}>
          {item.imageUrl ? <Image source={{uri:item.imageUrl}} accessibilityLabel={`${item.name} image`} resizeMode="cover" style={styles.image}/> : <Text style={styles.glyph}>{item.category.toLowerCase().includes('food')||item.tags.some(t=>['Biryani','Sweets','Rolls','Cafe','Chinese','Bakery'].includes(t))?'◉':item.category.toLowerCase().includes('market')||item.category.toLowerCase().includes('shopping')||item.category.toLowerCase().includes('book')?'⌑':'✦'}</Text>}
          {item.imageAttribution ? <Text style={styles.photoCredit}>{item.imageAttribution}</Text> : null}
        </View>
        <View style={styles.body}><Text style={styles.category}>{item.category.toUpperCase()} · {item.neighborhood.toUpperCase()}</Text><Text style={styles.name}>{item.name}</Text><Text style={styles.description} numberOfLines={3}>{item.description}</Text><Text style={styles.tagline}>{item.tags.join('  ·  ')}</Text><Text style={styles.source}>ⓘ {item.source}</Text>{item.status?<Text style={styles.status}>{item.status}</Text>:null}</View>
      </Pressable></Link>
      <Pressable accessibilityRole="button" accessibilityLabel={`${isFavorite(item.id)?'Remove from':'Add to'} favorites: ${item.name}`} accessibilityState={{selected:isFavorite(item.id)}} onPress={()=>toggleFavorite(item.id)} style={styles.favorite}><Text style={styles.favoriteText}>{isFavorite(item.id)?'♥':'♡'}</Text></Pressable>
    </View>)}
    {!visible.length?<View style={styles.empty}><Text style={styles.name}>No matches for this filter</Text><Text style={styles.description}>Try a broader search or choose “All”.</Text></View>:null}
    <Text style={styles.footer}>Prices, hours, stock and ratings are shown only when verified. Confirm details before travelling.</Text>
  </ScrollView>;
}

function makeStyles(c: ReturnType<typeof useAppTheme>['colors']) { return StyleSheet.create({
  page:{flex:1,backgroundColor:c.background},content:{padding:21,paddingTop:55,paddingBottom:38},back:{color:c.primary,fontWeight:'700',marginBottom:22},eyebrow:{color:c.secondary,fontSize:10,fontWeight:'800',letterSpacing:1.6},title:{color:c.textPrimary,fontSize:32,fontWeight:'800',marginTop:7},subtitle:{color:c.textSecondary,fontSize:14,lineHeight:21,marginTop:7},search:{backgroundColor:c.surfaceLight,color:c.textPrimary,borderWidth:1,borderColor:c.surfaceBorder,borderRadius:15,padding:15,marginTop:18,fontSize:15},filters:{marginTop:13,flexGrow:0},filter:{backgroundColor:c.surfaceLight,paddingHorizontal:13,paddingVertical:9,borderRadius:18,marginRight:7},filterText:{color:c.textSecondary,fontSize:12,fontWeight:'700'},activeFilter:{backgroundColor:c.primary},activeFilterText:{color:c.textOnPrimary},count:{fontSize:9,color:c.textMuted,fontWeight:'800',letterSpacing:1,marginTop:22,marginBottom:10},card:{backgroundColor:c.surface,borderRadius:18,overflow:'hidden',marginBottom:13,borderWidth:1,borderColor:c.surfaceBorder},art:{height:180,justifyContent:'center',alignItems:'center'},image:{width:'100%',height:'100%'},glyph:{fontSize:42,color:c.secondary},photoCredit:{position:'absolute',bottom:5,right:8,color:'#fff',fontSize:9,textShadowColor:'#000',textShadowRadius:4},body:{padding:14},category:{fontSize:9,color:c.secondary,fontWeight:'800',letterSpacing:.8},name:{fontSize:19,fontWeight:'800',color:c.textPrimary,marginTop:5},description:{fontSize:13,lineHeight:19,color:c.textSecondary,marginTop:6},tagline:{fontSize:11,color:c.secondary,fontWeight:'700',marginTop:9},source:{fontSize:10,lineHeight:15,color:c.textMuted,marginTop:10},status:{fontSize:11,lineHeight:16,color:c.warning,marginTop:6},favorite:{position:'absolute',top:10,right:10,width:40,height:40,borderRadius:20,backgroundColor:c.surface,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:c.surfaceBorder},favoriteText:{fontSize:23,color:c.primary,marginTop:-2},empty:{padding:18,backgroundColor:c.surfaceLight,borderRadius:16,marginTop:12},footer:{color:c.textMuted,fontSize:11,lineHeight:17,textAlign:'center',marginTop:15}
}); }
