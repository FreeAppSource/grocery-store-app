import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function StoreCard({ store }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
      onPress={() => router.push({ pathname: '/store-detail', params: { storeId: store.id } })}
      activeOpacity={0.85}
    >
      <View style={styles.imageBox}>
        <Image
          source={require('../assets/images/store_more.png')}
          style={styles.image}
          resizeMode="cover"
        />
        {store.discount && (
          <View style={[styles.discountBadge, { backgroundColor: colors.accentOrange }]}>
            <Text style={styles.discountText}>{store.discount}</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.topInfo}>
          <Text style={[styles.storeName, { color: theme.text }]} numberOfLines={1}>
            {store.name}
          </Text>
          <View style={styles.speedRow}>
            <Ionicons name="time-outline" size={13} color={colors.primary} />
            <Text style={[styles.speedText, { color: colors.primary }]}>{store.deliveryTime}</Text>
          </View>
        </View>

        <View style={styles.bottomInfo}>
          <Text style={[styles.locationText, { color: theme.subText }]}>
            {store.location} • {store.distance}
          </Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={12} color="#FFC107" />
            <Text style={[styles.ratingVal, { color: theme.text }]}>{store.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    gap: 12,
  },
  imageBox: {
    width: 76,
    height: 76,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
  details: { flex: 1, justifyContent: 'space-between', height: 68 },
  topInfo: { gap: 2 },
  storeName: { fontSize: 15, fontWeight: '800' },
  speedRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  speedText: { fontSize: 11, fontWeight: '700' },
  bottomInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationText: { fontSize: 12 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingVal: { fontSize: 11, fontWeight: '800' },
});
