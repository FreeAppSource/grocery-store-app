import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { categoriesData, storesData, productsData } from '../../data';
import Header from '../../components/Header';
import StoreCard from '../../components/StoreCard';
import ProductCard from '../../components/ProductCard';

export default function ExploreScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartQuantities, setCartQuantities] = useState({ 'p-potato': 1, 'p-tomato': 2 });

  const filteredStores = storesData.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIncrement = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Header with Search and Cart counter */}
      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={() => {}}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* January Offer Promo Banner (Sketch: Home_01) */}
        <View style={styles.bannerWrapper}>
          <View style={[styles.offerBanner, { backgroundColor: colors.primary }]}>
            <View style={styles.offerTextCol}>
              <View style={styles.offerTag}>
                <Text style={styles.offerTagText}>January Offer</Text>
              </View>
              <Text style={styles.offerTitle}>Get cashback up to 30% for all transaction</Text>
            </View>
            <Image
              source={require('../../assets/images/banner_offer.png')}
              style={styles.offerImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Covid-19 Safety Standards Banner (Sketch: Keeping you and our partners safe) */}
        <View style={styles.safetyWrapper}>
          <View style={[styles.safetyCard, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.safetyTitle, { color: colors.primaryDark }]}>Safety Standards</Text>
              <Text style={[styles.safetyDesc, { color: colors.primaryDark }]}>
                Keeping you and our delivery partners safe amid Covid-19
              </Text>
            </View>
          </View>
        </View>

        {/* Categories Section (Sketch: All, Medicines, Vegetables, Fruits, Utilities) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Categories</Text>
          <TouchableOpacity onPress={() => router.push('/store-detail')}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
          {categoriesData.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  { backgroundColor: isSelected ? colors.primary : theme.inputBg },
                ]}
                onPress={() => setActiveCategory(cat.name)}
              >
                <Ionicons
                  name={cat.icon}
                  size={16}
                  color={isSelected ? '#FFFFFF' : theme.text}
                />
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? '#FFFFFF' : theme.text, fontWeight: isSelected ? '800' : '600' },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* In-Store Pathfinding Shortcut Banner */}
        <TouchableOpacity
          style={[styles.pathfindingCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          onPress={() => router.push('/pathfinding')}
          activeOpacity={0.85}
        >
          <View style={[styles.pathIconBox, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="navigate-circle" size={28} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.pathTitle, { color: theme.text }]}>In-Store Smart Pathfinding</Text>
            <Text style={[styles.pathSub, { color: theme.subText }]}>
              Navigate directly to Maggi, Spinach & Milk shelf by shelf
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.subText} />
        </TouchableOpacity>

        {/* Featured Products Carousel */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Featured Products</Text>
          <TouchableOpacity onPress={() => router.push('/store-detail')}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsRow}>
          {productsData.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              count={cartQuantities[prod.id] || 0}
              onIncrement={() => handleIncrement(prod.id)}
              onDecrement={() => handleDecrement(prod.id)}
              onNavigatePress={() => router.push('/pathfinding')}
            />
          ))}
        </ScrollView>

        {/* Near By Stores Section (Sketch: Near By Stores - More Mega Store, Village Hypermarket, Simpli Namdhari) */}
        <View style={[styles.sectionHeaderRow, { marginTop: 12 }]}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Near By Stores</Text>
          <TouchableOpacity onPress={() => router.push('/store-detail')}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.storesList}>
          {filteredStores.map((st) => (
            <StoreCard key={st.id} store={st} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  bannerWrapper: { paddingHorizontal: 16, marginTop: 4 },
  offerBanner: {
    height: 120,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    overflow: 'hidden',
  },
  offerTextCol: { flex: 1, justifyContent: 'center' },
  offerTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  offerTagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  offerTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '900', lineHeight: 20 },
  offerImage: { width: 100, height: 100 },
  safetyWrapper: { paddingHorizontal: 16, marginTop: 12 },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    gap: 10,
  },
  safetyTitle: { fontSize: 13, fontWeight: '800' },
  safetyDesc: { fontSize: 11, marginTop: 2 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeading: { fontSize: 17, fontWeight: '900' },
  viewAllText: { fontSize: 13, fontWeight: '800' },
  categoriesRow: { paddingHorizontal: 16, gap: 8 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    gap: 6,
  },
  categoryText: { fontSize: 12 },
  pathfindingCard: {
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  pathIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pathTitle: { fontSize: 14, fontWeight: '800' },
  pathSub: { fontSize: 11, marginTop: 2 },
  productsRow: { paddingHorizontal: 16 },
  storesList: { paddingHorizontal: 16 },
});
