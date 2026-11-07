import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { busRoutes, findItem, foodShops, places, shoppingAreas } from '../../src/data/kolkataCatalog';
import { useFavorites } from '../../src/providers/FavoritesProvider';
import { useAppTheme } from '../../src/theme/ThemeProvider';

const modules = [
  { title: 'Places', href: '/places', icon: '✦', subtitle: 'Landmarks & local stories', color: 'placeCard' },
  { title: 'Food', href: '/food', icon: '◉', subtitle: 'Taste the city', color: 'foodCard' },
  { title: 'Shopping', href: '/shopping', icon: '⌑', subtitle: 'Markets & makers', color: 'shoppingCard' },
  { title: 'Routes', href: '/routes', icon: '↗', subtitle: 'Getting around', color: 'routeCard' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { colors, mode, toggleMode } = useAppTheme();
  const { favorites } = useFavorites();
  const s = useMemo(() => makeStyles(colors), [colors]);
  const counts = [places.length, foodShops.length, shoppingAreas.length, busRoutes.length];
  const saved = favorites.map(findItem).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const submitSearch = () => router.push({ pathname: '/search', params: { q: search } });
  const openProfile = async (url: string) => {
    try { await Linking.openURL(url); }
    catch { Alert.alert('Link unavailable', 'Your profile could not be opened. Please try again.'); }
  };

  return <ScrollView style={s.page} contentContainerStyle={s.content} keyboardShouldPersistTaps="always">
    <View style={s.topbar}><View><Text style={s.kicker}>A CITY FULL OF STORIES</Text><Text style={s.brand}>AFRAZ <Text style={s.brandAccent}>KOLKATA</Text></Text></View><Pressable accessibilityRole="button" accessibilityLabel={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} onPress={toggleMode} style={s.themeButton}><Text style={s.themeIcon}>{mode === 'dark' ? '☼' : '◐'}</Text></Pressable></View>

    <View style={s.hero}><View style={s.heroStamp}><Text style={s.stampText}>KOLKATA · INDIA</Text></View><Text style={s.heroTitle}>Make a day{ '\n' }of <Text style={s.heroAccent}>Kolkata.</Text></Text><Text style={s.heroCopy}>Find a new favourite, follow a craving, wander somewhere wonderful.</Text>
      <View style={s.searchWrap}><Text style={s.searchIcon}>⌕</Text><TextInput accessibilityLabel="Search Kolkata" placeholder="Places, food, markets…" placeholderTextColor={colors.textMuted} style={s.search} value={search} onChangeText={setSearch} returnKeyType="search" onSubmitEditing={submitSearch}/><Pressable accessibilityRole="button" accessibilityLabel="Search" onPress={submitSearch} style={s.goButton}><Text style={s.goText}>→</Text></Pressable></View>
    </View>

    <View style={s.sectionHead}><View><Text style={s.sectionTitle}>Find your scene</Text><Text style={s.sectionSub}>Pick a way to explore</Text></View><Text style={s.sectionMark}>01 / 04</Text></View>
    <View style={s.grid}>{modules.map((item,index)=><Pressable key={item.title} accessibilityRole="button" accessibilityLabel={`Explore ${item.title}, ${counts[index]} listings`} onPress={()=>router.push(item.href as never)} style={[s.tile,{backgroundColor:colors[item.color]}]}><View style={s.tileTop}><Text style={s.tileIcon}>{item.icon}</Text><Text style={s.tileArrow}>↗</Text></View><Text style={s.tileTitle}>{item.title}</Text><Text style={s.tileSubtitle}>{item.subtitle}</Text><Text style={s.tileCount}>{String(counts[index]).padStart(2,'0')} PICKS</Text></Pressable>)}</View>

    <Pressable accessibilityRole="button" onPress={()=>router.push('/planner')} style={s.planCard}><View style={s.planIcon}><Text style={s.planGlyph}>✳</Text></View><View style={s.planCopy}><Text style={s.planEyebrow}>MAKE IT YOURS</Text><Text style={s.planTitle}>Plan a Kolkata day</Text><Text style={s.planSub}>Save the stops you want to make.</Text></View><Text style={s.planArrow}>→</Text></Pressable>

    <View style={s.favoritePanel}><View style={s.favoriteHead}><View><Text style={s.sectionTitle}>Your saved places</Text><Text style={s.sectionSub}>{saved.length ? `${saved.length} in your collection` : 'Keep the good finds close'}</Text></View><Text style={s.heart}>♥</Text></View>{saved.length?saved.slice(0,6).map(item=><Pressable key={item.id} accessibilityRole="button" onPress={()=>router.push({pathname:'/places/[id]',params:{id:item.id}})} style={s.savedRow}><Text style={s.savedName}>{item.name}</Text><Text style={s.savedArrow}>↗</Text></Pressable>):<Text style={s.emptyCopy}>Tap the heart on any listing to start a personal collection. Saved on this device.</Text>}</View>
    <View style={s.aboutPanel}>
      <Text style={s.aboutEyebrow}>THE PERSON BEHIND THE GUIDE</Text>
      <Text style={s.aboutTitle}>About me</Text>
      <Text style={s.aboutCopy}>Find me on LinkedIn and GitHub.</Text>
      <View style={s.socialRow}>
        <Pressable accessibilityRole="link" accessibilityLabel="Open Afraz Ahamed on LinkedIn" accessibilityHint="Opens your LinkedIn profile" onPress={() => void openProfile('https://www.linkedin.com/in/afraz-ahamed-94601442b')} style={({ pressed }) => [s.socialButton, pressed && s.socialPressed]}>
          <View style={s.linkedinMark}><Text style={s.linkedinLetters}>in</Text></View>
          <View style={s.socialText}><Text style={s.socialName}>LinkedIn</Text><Text style={s.socialHandle}>Afraz Ahamed</Text></View>
          <Text style={s.socialArrow}>↗</Text>
        </Pressable>
        <Pressable accessibilityRole="link" accessibilityLabel="Open Afraz Dev Pro on GitHub" accessibilityHint="Opens your GitHub profile" onPress={() => void openProfile('https://github.com/Afraz-Dev-Pro')} style={({ pressed }) => [s.socialButton, pressed && s.socialPressed]}>
          <GithubMark />
          <View style={s.socialText}><Text style={s.socialName}>GitHub</Text><Text style={s.socialHandle}>Afraz-Dev-Pro</Text></View>
          <Text style={s.socialArrow}>↗</Text>
        </Pressable>
      </View>
    </View>
    <Text style={s.disclaimer}>Curated discovery directory · Check venue details and transport before you travel.</Text><Text style={s.footer}>AFRAZ KOLKATA   ✳   MADE FOR WANDERING</Text>
  </ScrollView>;
}

function GithubMark() {
  return <View style={styles.githubBadge}>
    <View style={styles.githubEars}><View style={[styles.githubEar, styles.githubEarLeft]} /><View style={[styles.githubEar, styles.githubEarRight]} /></View>
    <View style={styles.githubHead}><View style={styles.githubEyes}><View style={styles.githubEye} /><View style={styles.githubEye} /></View></View>
    <View style={styles.githubShoulders} />
  </View>;
}

const styles = StyleSheet.create({
  githubBadge:{width:40,height:40,borderRadius:12,backgroundColor:'#181717',alignItems:'center',justifyContent:'center',overflow:'hidden'},
  githubEars:{position:'absolute',top:8,width:23,flexDirection:'row',justifyContent:'space-between'},
  githubEar:{width:8,height:10,backgroundColor:'#fff',borderRadius:2},
  githubEarLeft:{transform:[{rotate:'-22deg'}]},
  githubEarRight:{transform:[{rotate:'22deg'}]},
  githubHead:{position:'absolute',top:13,width:24,height:21,borderTopLeftRadius:12,borderTopRightRadius:12,borderBottomLeftRadius:8,borderBottomRightRadius:8,backgroundColor:'#fff',alignItems:'center'},
  githubEyes:{position:'absolute',top:8,width:14,flexDirection:'row',justifyContent:'space-between'},
  githubEye:{width:3,height:4,borderRadius:2,backgroundColor:'#181717'},
  githubShoulders:{position:'absolute',bottom:4,width:29,height:8,borderTopLeftRadius:12,borderTopRightRadius:12,backgroundColor:'#fff'},
});

function makeStyles(c: ReturnType<typeof useAppTheme>['colors']) { return StyleSheet.create({
  page:{flex:1,backgroundColor:c.background},content:{paddingHorizontal:20,paddingTop:54,paddingBottom:32},topbar:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20},kicker:{color:c.secondary,fontSize:9,fontWeight:'900',letterSpacing:1.8},brand:{color:c.textPrimary,fontSize:16,fontWeight:'900',letterSpacing:1,marginTop:5},brandAccent:{color:c.primary},themeButton:{width:43,height:43,borderRadius:22,backgroundColor:c.surface,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:c.surfaceBorder},themeIcon:{fontSize:21,color:c.secondary},hero:{backgroundColor:c.surface,borderRadius:26,padding:21,overflow:'hidden',borderWidth:1,borderColor:c.surfaceBorder},heroStamp:{alignSelf:'flex-start',backgroundColor:c.accentMuted,paddingHorizontal:10,paddingVertical:6,borderRadius:12},stampText:{fontSize:8,fontWeight:'900',letterSpacing:1.2,color:c.accent},heroTitle:{fontSize:40,lineHeight:42,fontWeight:'900',color:c.textPrimary,marginTop:17,letterSpacing:-1},heroAccent:{color:c.primary},heroCopy:{fontSize:13,lineHeight:19,color:c.textSecondary,marginTop:10,maxWidth:285},searchWrap:{marginTop:20,height:52,borderRadius:15,backgroundColor:c.background,borderWidth:1,borderColor:c.surfaceBorder,flexDirection:'row',alignItems:'center',paddingLeft:12},searchIcon:{fontSize:27,color:c.secondary,marginRight:5},search:{flex:1,color:c.textPrimary,fontSize:13,paddingVertical:10},goButton:{width:40,height:40,borderRadius:12,backgroundColor:c.primary,alignItems:'center',justifyContent:'center',marginRight:5},goText:{fontSize:22,fontWeight:'800',color:c.textOnPrimary},sectionHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginTop:27,marginBottom:12},sectionTitle:{fontSize:19,fontWeight:'900',color:c.textPrimary,letterSpacing:-.3},sectionSub:{fontSize:11,color:c.textSecondary,marginTop:4},sectionMark:{fontSize:9,fontWeight:'900',letterSpacing:1,color:c.secondary,marginBottom:3},grid:{flexDirection:'row',flexWrap:'wrap',gap:10},tile:{width:'48%',flexGrow:1,minHeight:140,borderRadius:19,padding:14},tileTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},tileIcon:{fontSize:25,color:c.primary},tileArrow:{fontSize:15,color:c.textMuted},tileTitle:{fontSize:16,fontWeight:'900',color:c.textPrimary,marginTop:11},tileSubtitle:{fontSize:10,color:c.textSecondary,marginTop:3},tileCount:{fontSize:8,fontWeight:'900',letterSpacing:1,color:c.secondary,marginTop:12},planCard:{backgroundColor:c.primary,borderRadius:20,padding:15,marginTop:15,flexDirection:'row',alignItems:'center'},planIcon:{width:42,height:42,borderRadius:14,backgroundColor:'rgba(255,255,255,0.2)',alignItems:'center',justifyContent:'center'},planGlyph:{fontSize:22,color:c.textOnPrimary},planCopy:{flex:1,marginLeft:12},planEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1,color:c.textOnPrimary,opacity:.8},planTitle:{fontSize:15,fontWeight:'900',color:c.textOnPrimary,marginTop:3},planSub:{fontSize:10,color:c.textOnPrimary,opacity:.85,marginTop:3},planArrow:{fontSize:21,fontWeight:'800',color:c.textOnPrimary,paddingLeft:8},favoritePanel:{backgroundColor:c.surface,borderRadius:20,padding:16,marginTop:15,borderWidth:1,borderColor:c.surfaceBorder},favoriteHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},heart:{fontSize:22,color:c.primary},emptyCopy:{fontSize:12,lineHeight:18,color:c.textSecondary,marginTop:6},savedRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:11,borderTopWidth:1,borderTopColor:c.surfaceBorder},savedName:{fontSize:13,fontWeight:'700',color:c.textPrimary},savedArrow:{fontSize:16,color:c.primary},aboutPanel:{backgroundColor:c.surface,borderRadius:20,padding:16,marginTop:15,borderWidth:1,borderColor:c.surfaceBorder},aboutEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.2,color:c.secondary},aboutTitle:{fontSize:19,fontWeight:'900',color:c.textPrimary,marginTop:6},aboutCopy:{fontSize:11,color:c.textSecondary,marginTop:3},socialRow:{flexDirection:'row',gap:9,marginTop:14},socialButton:{flex:1,minWidth:0,flexDirection:'row',alignItems:'center',gap:8,backgroundColor:c.background,borderRadius:15,padding:9,borderWidth:1,borderColor:c.surfaceBorder},socialPressed:{opacity:.7,transform:[{scale:.98}]},linkedinMark:{width:40,height:40,borderRadius:12,backgroundColor:'#0A66C2',alignItems:'center',justifyContent:'center'},linkedinLetters:{color:'#fff',fontSize:22,fontWeight:'900',letterSpacing:-1},socialText:{flex:1,minWidth:0},socialName:{color:c.textPrimary,fontSize:11,fontWeight:'900'},socialHandle:{color:c.textSecondary,fontSize:9,marginTop:3},socialArrow:{color:c.secondary,fontSize:14,fontWeight:'900'},disclaimer:{fontSize:10,lineHeight:16,color:c.textMuted,marginTop:18,textAlign:'center'},footer:{fontSize:8,fontWeight:'800',letterSpacing:1.1,color:c.secondary,textAlign:'center',marginTop:20}
}); }
