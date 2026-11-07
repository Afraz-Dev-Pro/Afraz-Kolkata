import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { findItem, places, foodShops, shoppingAreas, type CatalogItem } from '../src/data/kolkataCatalog';
import { useAppTheme } from '../src/theme/ThemeProvider';

const directory = [...places, ...foodShops, ...shoppingAreas];
export default function PlannerScreen() {
  const { add } = useLocalSearchParams<{ add?: string }>();
  const router = useRouter();
  const { colors } = useAppTheme();
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [stops, setStops] = useState<CatalogItem[]>([]);
  const [adding, setAdding] = useState(false);
  const pending = Array.isArray(add) ? add[0] : add;

  useEffect(() => {
    if (!pending) return;
    const item = findItem(pending);
    if (item) setStops((current) => current.some((stop) => stop.id === item.id) ? current : [...current, item]);
  }, [pending]);

  const sharePlan = async () => {
    if (!stops.length) return Alert.alert('Your plan is empty', 'Add places, food stops, or markets first.');
    const itinerary = stops.map((stop, index) => `${index + 1}. ${stop.name} — ${stop.neighborhood}`).join('\n');
    await Share.share({ message: `My Kolkata day plan\n${itinerary}\n\nTravel times, routes, opening hours and costs need to be checked before travel.` });
  };

  const suggestions = useMemo(() => directory.filter((item) => !stops.some((stop) => stop.id === item.id)), [stops]);
  const move = (index: number, offset: number) => setStops((current) => {
    const target = index + offset;
    if (target < 0 || target >= current.length) return current;
    const next = [...current]; [next[index], next[target]] = [next[target], next[index]]; return next;
  });

  return <ScrollView style={s.page} contentContainerStyle={s.content}>
    <Pressable onPress={() => router.back()}><Text style={s.back}>‹  Back</Text></Pressable>
    <Text style={s.eyebrow}>YOUR KOLKATA DAY</Text><Text style={s.title}>Plan your stops</Text>
    <Text style={s.subtitle}>Build a multi-stop list from the offline directory. Route times, fares, prices and opening hours are not available in this build.</Text>
    <View style={s.panel}><Text style={s.panelTitle}>Your itinerary · {stops.length} stops</Text>
      {!stops.length ? <Text style={s.empty}>No stops added yet. Start with one of the suggested places below.</Text> : stops.map((item, index) => <View key={item.id} style={s.stop}>
        <Pressable style={s.stopMain} onPress={() => router.push({ pathname: '/places/[id]', params: { id: item.id } })}><Text style={s.number}>{index + 1}</Text><View style={s.stopText}><Text style={s.stopName}>{item.name}</Text><Text style={s.meta}>{item.category} · {item.neighborhood}</Text></View></Pressable>
        <View style={s.controls}><Pressable accessibilityLabel={`Move ${item.name} up`} onPress={() => move(index, -1)}><Text style={s.control}>↑</Text></Pressable><Pressable accessibilityLabel={`Move ${item.name} down`} onPress={() => move(index, 1)}><Text style={s.control}>↓</Text></Pressable><Pressable accessibilityLabel={`Remove ${item.name}`} onPress={() => setStops((current) => current.filter((stop) => stop.id !== item.id))}><Text style={s.remove}>×</Text></Pressable></View>
      </View>)}
      <Pressable style={[s.shareButton, !stops.length && s.disabled]} onPress={sharePlan}><Text style={s.shareText}>Share this plan</Text></Pressable>
    </View>
    <Pressable style={s.secondary} onPress={() => setAdding((value) => !value)}><Text style={s.secondaryText}>{adding ? 'Hide directory' : '＋ Add a stop from the directory'}</Text></Pressable>
    {(adding || !stops.length) && suggestions.slice(0, adding ? suggestions.length : 8).map((item) => <Pressable key={item.id} style={s.suggestion} onPress={() => setStops((current) => [...current, item])}><View style={s.stopText}><Text style={s.stopName}>{item.name}</Text><Text style={s.meta}>{item.category} · {item.neighborhood}</Text></View><Text style={s.plus}>＋</Text></Pressable>)}
    <Text style={s.footnote}>This offline itinerary is not saved to an account. Confirm details with the listed source and use Google Maps for navigation.</Text>
  </ScrollView>;
}

function makeStyles(c:ReturnType<typeof useAppTheme>['colors']) { return StyleSheet.create({ page:{flex:1,backgroundColor:c.background}, content:{padding:22,paddingTop:55,paddingBottom:40}, back:{color:c.primary,fontWeight:'700',marginBottom:22}, eyebrow:{color:c.secondary,fontSize:10,fontWeight:'900',letterSpacing:1.4}, title:{fontSize:32,fontWeight:'800',color:c.textPrimary,marginTop:7}, subtitle:{fontSize:14,lineHeight:21,color:c.textSecondary,marginTop:8}, panel:{backgroundColor:c.surface,borderRadius:18,padding:16,marginTop:20,borderWidth:1,borderColor:c.surfaceBorder}, panelTitle:{fontSize:17,fontWeight:'800',color:c.textPrimary}, empty:{fontSize:13,lineHeight:19,color:c.textSecondary,marginTop:12}, stop:{flexDirection:'row',alignItems:'center',paddingVertical:11,borderBottomWidth:1,borderBottomColor:c.surfaceBorder}, stopMain:{flex:1,flexDirection:'row',alignItems:'center'}, number:{width:29,height:29,textAlign:'center',textAlignVertical:'center',overflow:'hidden',borderRadius:15,backgroundColor:c.surfaceLight,color:c.secondary,fontWeight:'800',paddingTop:5}, stopText:{flex:1,marginLeft:10}, stopName:{fontSize:14,fontWeight:'800',color:c.textPrimary}, meta:{fontSize:11,color:c.textSecondary,marginTop:3}, controls:{flexDirection:'row',alignItems:'center',gap:10}, control:{fontSize:20,color:c.primary,paddingHorizontal:3}, remove:{fontSize:23,color:c.error,paddingHorizontal:3}, shareButton:{backgroundColor:c.primary,padding:13,alignItems:'center',borderRadius:12,marginTop:14}, disabled:{opacity:.45}, shareText:{color:c.textOnPrimary,fontWeight:'800'}, secondary:{borderWidth:1,borderColor:c.primary,padding:14,borderRadius:13,alignItems:'center',marginTop:13}, secondaryText:{color:c.primary,fontWeight:'800'}, suggestion:{backgroundColor:c.surface,padding:13,borderRadius:13,marginTop:8,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:c.surfaceBorder}, plus:{color:c.primary,fontSize:21,fontWeight:'800',paddingHorizontal:4}, footnote:{fontSize:11,lineHeight:17,color:c.textMuted,textAlign:'center',marginTop:18} }); }
