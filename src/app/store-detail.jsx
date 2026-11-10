import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { storesData, productsData } from '../data';
import ProductCard from '../components/ProductCard';

export default function StoreDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const store = storesData.find((s) => s.id === params.storeId) || storesData[0];
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [storeSearch, setStoreSearch] = useState('');
  const [quantities, setQuantities] = useState({ 'p-potato': 1, 'p-spinach': 1 });

  const departments = ['All', 'Fruits', 'Vegetables', 'Dairy'];

  const filteredProducts = productsData.filter((p) => {
    const matchDept = activeDepartment === 'All' || p.category.toLowerCase().includes(activeDepartment.toLowerCase());
    const matchSearch = p.name.toLowerCase().includes(storeSearch.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Store Details</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.cartIconBtn}>
          <Ionicons name="cart-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Store Profile Card (Sketch: Particular store details) */}
        <View style={[styles.storeCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <Image
            source={require('../assets/images/store_more.png')}
            style={styles.storeHeroThumb}
          />
          <View style={styles.storeHeaderInfo}>
            <Text style={[styles.storeName, { color: theme.text }]}>{store.name}</Text>
            <Text style={[styles.storeFullAddress, { color: theme.subText }]}>
              {store.fullAddress}
            </Text>
            <View style={styles.tagsRow}>
              <View style={[styles.distanceBadge, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="location" size={12} color={colors.primary} />
                <Text style={styles.distanceBadgeText}>{store.distance}</Text>
              </View>
              <View style={[styles.distanceBadge, { backgroundColor: '#F1F3F5' }]}>
                <Ionicons name="time-outline" size={12} color="#555" />
                <Text style={[styles.distanceBadgeText, { color: '#555' }]}>{store.deliveryTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* In-Store Search Bar */}
        <View style={[styles.searchBox, { backgroundColor: theme.inputBg }]}>
          <Ionicons name="search" size={18} color={theme.subText} />
          <TextInput
            value={storeSearch}
            onChangeText={setStoreSearch}
            placeholder={`Search in ${store.name}...`}
            placeholderTextColor={theme.subText}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>

        {/* Department Tabs: All | Fruits | Vegetables | Dairy */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deptTabsRow}>
          {departments.map((dept) => {
            const isSelected = activeDepartment === dept;
            return (
              <TouchableOpacity
                key={dept}
                style={[
                  styles.deptChip,
                  { backgroundColor: isSelected ? colors.primary : theme.inputBg },
                ]}
                onPress={() => setActiveDepartment(dept)}
              >
                <Text
                  style={[
                    styles.deptChipText,
                    { color: isSelected ? '#FFFFFF' : theme.text, fontWeight: isSelected ? '800' : '600' },
                  ]}
                >
                  {dept}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              count={quantities[p.id] || 0}
              onIncrement={() => setQuantities((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }))}
              onDecrement={() => setQuantities((prev) => ({ ...prev, [p.id]: Math.max(0, (prev[p.id] || 0) - 1) }))}
              onNavigatePress={() => router.push('/pathfinding')}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Bottom Cart Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.surface, borderTopColor: theme.divider }]}>
        <View>
          <Text style={[styles.barItemsCount, { color: theme.subText }]}>2 Items Added</Text>
          <Text style={[styles.barTotal, { color: colors.primaryDark }]}>₹70 Subtotal</Text>
        </View>

        <TouchableOpacity
          style={[styles.viewCartBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/cart')}
          activeOpacity={0.85}
        >
          <Text style={styles.viewCartText}>View Cart</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  cartIconBtn: { padding: 4 },
  scrollContent: { padding: 16, paddingBottom: 80, gap: 14 },
  storeCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
  },
  storeHeroThumb: { width: 72, height: 72, borderRadius: 12 },
  storeHeaderInfo: { flex: 1, gap: 4 },
  storeName: { fontSize: 16, fontWeight: '800' },
  storeFullAddress: { fontSize: 11, lineHeight: 16 },
  tagsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  distanceBadgeText: { fontSize: 11, fontWeight: '800', color: colors.primaryDark },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  deptTabsRow: { gap: 8 },
  deptChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  deptChipText: { fontSize: 13 },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  barItemsCount: { fontSize: 11, fontWeight: '600' },
  barTotal: { fontSize: 16, fontWeight: '900' },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.full,
    gap: 6,
  },
  viewCartText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
