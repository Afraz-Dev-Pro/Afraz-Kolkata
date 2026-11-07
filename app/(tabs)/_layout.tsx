import { Tabs } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../src/theme/ThemeProvider';

export default function TabLayout() {
  const { colors } = useAppTheme();
  const [showSplash, setShowSplash] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const start = setTimeout(() => Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(), 450);
    const safety = setTimeout(() => setShowSplash(false), 1_250);
    return () => { clearTimeout(start); clearTimeout(safety); opacity.stopAnimation(); };
  }, [opacity]);

  const tab = (name: string, label: string, glyph: string) => <Tabs.Screen key={name} name={name} options={{
    title: label,
    tabBarLabel: label,
    tabBarAccessibilityLabel: `Open ${label}`,
    tabBarIcon: ({ color, focused }) => <View style={{ width: 34, height: 26, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? colors.primaryMuted : 'transparent' }}><Text style={{ color, fontSize: 17, fontWeight: '900' }}>{glyph}</Text></View>,
  }} />;

  return <View style={{ flex: 1, backgroundColor: colors.background }}>
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.surfaceBorder, borderTopWidth: 1, height: 72, paddingTop: 6, paddingBottom: 8, elevation: 12 }, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textMuted, tabBarLabelStyle: { fontSize: 8, fontWeight: '800' } }}>
      {tab('index', 'Home', '⌂')}
      {tab('places', 'Places', '✦')}
      {tab('food', 'Food', '◉')}
      {tab('shopping', 'Shop', '⌑')}
      {tab('routes', 'Routes', '↗')}
      {tab('planner', 'Planner', '☷')}
    </Tabs>
    {showSplash ? <Animated.View pointerEvents="none" style={[styles.splash, { backgroundColor: colors.background, opacity }]}><Text style={[styles.brand, { color: colors.secondary }]}>AFRAZ KOLKATA</Text><Text style={[styles.caption, { color: colors.textSecondary }]}>Explore the city, your way</Text><View style={[styles.dot, { backgroundColor: colors.primary }]} /></Animated.View> : null}
  </View>;
}

const styles = StyleSheet.create({ splash: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', zIndex: 10 }, brand: { fontSize: 18, fontWeight: '900', letterSpacing: 3 }, caption: { fontSize: 13, marginTop: 9 }, dot: { width: 12, height: 12, borderRadius: 6, marginTop: 25 } });
