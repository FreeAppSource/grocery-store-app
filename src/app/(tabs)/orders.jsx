import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { pastOrdersData } from '../../data';

export default function OrdersScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleReorder = (order) => {
    Alert.alert(
      'Reorder Items',
      `Added all ${order.itemsSummary} from ${order.storeName} to your cart.`,
      [
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
        { text: 'Continue' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {pastOrdersData.map((order) => (
          <View
            key={order.id}
            style={[styles.orderCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.storeIconBox, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="storefront" size={20} color={colors.primary} />
              </View>
              <View style={styles.storeMeta}>
                <Text style={[styles.storeName, { color: theme.text }]}>{order.storeName}</Text>
                <Text style={[styles.orderSub, { color: theme.subText }]}>
                  {order.orderNumber} • {order.itemsSummary}
                </Text>
              </View>

              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>{order.date}</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.divider }]} />

            <View style={styles.cardBottom}>
              <View>
                <Text style={[styles.totalLabel, { color: theme.subText }]}>Order Total</Text>
                <Text style={[styles.totalVal, { color: colors.primaryDark }]}>{order.totalPrice}</Text>
              </View>

              <TouchableOpacity
                style={[styles.reorderBtn, { backgroundColor: colors.primary }]}
                onPress={() => handleReorder(order)}
                activeOpacity={0.8}
              >
                <Ionicons name="repeat" size={14} color="#FFFFFF" />
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingVertical: 12 },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 16, gap: 14 },
  orderCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  storeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeMeta: { flex: 1 },
  storeName: { fontSize: 15, fontWeight: '800' },
  orderSub: { fontSize: 12, marginTop: 2 },
  dateBadge: {
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dateText: { fontSize: 11, fontWeight: '800', color: '#555555' },
  divider: { height: 1, width: '100%', marginVertical: 14 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 11, fontWeight: '600' },
  totalVal: { fontSize: 16, fontWeight: '900', marginTop: 2 },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radius.full,
    gap: 6,
  },
  reorderText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
});
