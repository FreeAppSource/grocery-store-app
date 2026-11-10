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
import { productImages } from '../../assets/images/products';

export default function CartScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [cartItems, setCartItems] = useState([
    {
      id: 'c-1',
      name: 'Tomato',
      shelf: 'Shelf 1',
      qty: 2,
      price: 22,
      image: productImages['p-tomato'],
    },
    {
      id: 'c-2',
      name: 'Spinach',
      shelf: 'Shelf 1',
      qty: 1,
      price: 35,
      image: productImages['p-spinach'],
    },
    {
      id: 'c-3',
      name: 'Milk',
      shelf: 'Shelf 2',
      qty: 1,
      price: 28,
      image: productImages['p-milk'],
    },
  ]);

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 20;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={() => setCartItems([])}>
            <Text style={[styles.clearText, { color: colors.accentRed }]}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* Empty Cart State (Sketch: Empty cart - No Items in the Cart) */
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="cart-outline" size={64} color={colors.primary} />
          </View>
          <Text style={[styles.emptyHeading, { color: theme.text }]}>No Items in the Cart</Text>
          <Text style={[styles.emptySub, { color: theme.subText }]}>
            Your cart is empty. Add some items to see it here.
          </Text>
          <TouchableOpacity
            style={[styles.addItemsBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.addItemsBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Active Store Indicator (Sketch: More Mega Store > Bellandur > Add Items) */}
          <View style={[styles.storeHeaderCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
            <View style={styles.storeHeaderLeft}>
              <Ionicons name="storefront" size={20} color={colors.primary} />
              <View>
                <Text style={[styles.storeTitle, { color: theme.text }]}>More Mega Store</Text>
                <Text style={[styles.storeSub, { color: theme.subText }]}>Bellandur</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.addMoreBtn, { borderColor: colors.primary }]}
              onPress={() => router.push('/store-detail')}
            >
              <Text style={[styles.addMoreBtnText, { color: colors.primaryDark }]}>+ Add Items</Text>
            </TouchableOpacity>
          </View>

          {/* Smart In-Store Pathfinder Banner */}
          <TouchableOpacity
            style={[styles.inStoreNavBanner, { backgroundColor: colors.primarySoft }]}
            onPress={() => router.push('/pathfinding')}
          >
            <Ionicons name="map-outline" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.inStoreNavTitle, { color: colors.primaryDark }]}>
                In-Store Shopping Mode
              </Text>
              <Text style={[styles.inStoreNavSub, { color: colors.primaryDark }]}>
                Items arranged by aisle: Shelf 1 (2 items), Shelf 2 (1 item)
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>

          {/* Cart Item Rows */}
          <View style={styles.itemsList}>
            {cartItems.map((item) => (
              <View
                key={item.id}
                style={[styles.itemCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
              >
                <Image source={item.image} style={styles.itemImage} resizeMode="contain" />

                <View style={styles.itemMeta}>
                  <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                  <View style={styles.shelfTag}>
                    <Text style={styles.shelfTagText}>{item.shelf}</Text>
                  </View>
                  <Text style={[styles.itemPrice, { color: colors.primaryDark }]}>₹{item.price}</Text>
                </View>

                {/* Stepper */}
                <View style={[styles.stepper, { backgroundColor: theme.inputBg }]}>
                  <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.stepBtn}>
                    <Ionicons name="remove" size={16} color={theme.text} />
                  </TouchableOpacity>
                  <Text style={[styles.stepCount, { color: theme.text }]}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.stepBtn}>
                    <Ionicons name="add" size={16} color={theme.text} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Bill Summary */}
          <View style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
            <Text style={[styles.summaryTitle, { color: theme.text }]}>Bill Details</Text>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.subText }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>₹{subtotal}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.subText }]}>Delivery Fee</Text>
              <Text style={[styles.summaryValue, { color: colors.primary }]}>₹{deliveryFee}</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.divider }]} />

            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Total to Pay</Text>
              <Text style={[styles.totalValue, { color: colors.primaryDark }]}>₹{total}</Text>
            </View>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/checkout')}
            activeOpacity={0.85}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout (₹{total})</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  clearText: { fontSize: 13, fontWeight: '700' },
  scrollContent: { padding: 16, gap: 14 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyHeading: { fontSize: 20, fontWeight: '900', marginBottom: 8 },
  emptySub: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  addItemsBtn: {
    height: 50,
    paddingHorizontal: 32,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemsBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  storeHeaderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  storeHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  storeTitle: { fontSize: 14, fontWeight: '800' },
  storeSub: { fontSize: 11 },
  addMoreBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1.5,
  },
  addMoreBtnText: { fontSize: 12, fontWeight: '800' },
  inStoreNavBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    gap: 10,
  },
  inStoreNavTitle: { fontSize: 13, fontWeight: '800' },
  inStoreNavSub: { fontSize: 11, marginTop: 2 },
  itemsList: { gap: 10 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  itemImage: { width: 56, height: 56 },
  itemMeta: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '800' },
  shelfTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    marginBottom: 4,
  },
  shelfTagText: { fontSize: 10, fontWeight: '700' },
  itemPrice: { fontSize: 14, fontWeight: '900' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 10,
  },
  stepBtn: { padding: 4 },
  stepCount: { fontSize: 13, fontWeight: '800' },
  summaryCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
  },
  summaryTitle: { fontSize: 15, fontWeight: '800', marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, fontWeight: '600' },
  summaryValue: { fontSize: 13, fontWeight: '700' },
  divider: { height: 1, width: '100%', marginVertical: 4 },
  totalLabel: { fontSize: 15, fontWeight: '900' },
  totalValue: { fontSize: 17, fontWeight: '900' },
  checkoutBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    marginBottom: 20,
  },
  checkoutBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
