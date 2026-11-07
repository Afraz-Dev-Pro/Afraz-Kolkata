import { Tabs } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { FavoritesProvider } from '../src/providers/FavoritesProvider';
import { ThemeProvider, useAppTheme } from '../src/theme/ThemeProvider';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } });

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}><ThemeProvider><FavoritesProvider><MainTabs/></FavoritesProvider></ThemeProvider></QueryClientProvider>;
}

function MainTabs(){
  const {colors,mode}=useAppTheme();
  const [showSplash,setShowSplash]=useState(true);
  const opacity=useRef(new Animated.Value(1)).current;
  useEffect(()=>{
    const start=setTimeout(()=>Animated.timing(opacity,{toValue:0,duration:400,useNativeDriver:true}).start(),450);
    // The splash is decorative only and must never block navigation or taps.
    const safety=setTimeout(()=>setShowSplash(false),1250);
    return()=>{clearTimeout(start);clearTimeout(safety);opacity.stopAnimation();};
  },[opacity]);
  const tab=(title:string,label:string,glyph:string)=><Tabs.Screen key={title} name={title} options={{title:label,tabBarLabel:label,tabBarAccessibilityLabel:`Open ${label}`,tabBarIcon:({color,focused})=><View style={{width:37,height:27,borderRadius:14,alignItems:'center',justifyContent:'center',backgroundColor:focused?colors.primaryMuted:'transparent'}}><Text style={{color,fontSize:18,fontWeight:'900'}}>{glyph}</Text></View>}}/>;
  return <View style={{flex:1,backgroundColor:colors.background}}>
    <StatusBar style={mode==='dark'?'light':'dark'}/>
    <Tabs screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:colors.surface,borderTopColor:colors.surfaceBorder,borderTopWidth:1,height:72,paddingTop:7,paddingBottom:9,elevation:12},tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.textMuted,tabBarLabelStyle:{fontSize:9,fontWeight:'800'}}}>
      <Tabs.Screen name="index" options={{href:null}}/>
      {tab('places','Places','⌖')}{tab('food','Food','◉')}{tab('shopping','Shop','⌑')}{tab('routes','Routes','↗')}{tab('planner','Planner','☷')}
      <Tabs.Screen name="search" options={{href:null}}/><Tabs.Screen name="places/[id]" options={{href:null}}/>
    </Tabs>
    {showSplash?<Animated.View pointerEvents="none" style={[styles.splash,{backgroundColor:colors.background,opacity}]}><Text style={[styles.brand,{color:colors.secondary}]}>AFRAZ KOLKATA</Text><Text style={[styles.caption,{color:colors.textSecondary}]}>Explore the city, your way</Text><View style={[styles.dot,{backgroundColor:colors.primary}]}/></Animated.View>:null}
  </View>;
}

const styles=StyleSheet.create({splash:{...StyleSheet.absoluteFill,alignItems:'center',justifyContent:'center',zIndex:10},brand:{fontSize:18,fontWeight:'900',letterSpacing:3},caption:{fontSize:13,marginTop:9},dot:{width:12,height:12,borderRadius:6,marginTop:25}});
