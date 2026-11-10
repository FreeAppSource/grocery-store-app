import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { getProductImage } from '../assets/images/products';

export default function ProductCard({ product, count = 0, onIncrement, onDecrement, onNavigatePress }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
      {/* Product Image & Shelf Tag */}
      <View style={styles.imageBox}>
        <Image
          source={getProductImage(product.id)}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.shelfPill} onPress={() => onNavigatePress && onNavigatePress(product)}>
          <Ionicons name="navigate-outline" size={10} color={colors.primary} />
          <Text style={styles.shelfText}>{product.shelf}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={[styles.weight, { color: theme.subText }]}>{product.weight}</Text>

        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: theme.text }]}>₹{product.price}</Text>

          {count === 0 ? (
            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: colors.primary }]}
              onPress={onIncrement}
            >
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.stepper, { backgroundColor: colors.primarySoft }]}>
              <TouchableOpacity onPress={onDecrement} style={styles.stepBtn}>
                <Ionicons name="remove" size={14} color={colors.primaryDark} />
              </TouchableOpacity>
              <Text style={styles.stepCount}>{count}</Text>
              <TouchableOpacity onPress={onIncrement} style={styles.stepBtn}>
                <Ionicons name="add" size={14} color={colors.primaryDark} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
    marginRight: 12,
    marginBottom: 12,
  },
  imageBox: {
    width: '100%',
    height: 96,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '80%', height: '80%' },
  shelfPill: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  shelfText: { fontSize: 10, fontWeight: '800', color: colors.primaryDark },
  info: { marginTop: 6 },
  name: { fontSize: 13, fontWeight: '800' },
  weight: { fontSize: 11, marginTop: 2, marginBottom: 8 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 15, fontWeight: '900' },
  addBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  addBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: radius.full,
    gap: 6,
  },
  stepBtn: { padding: 3 },
  stepCount: { fontSize: 12, fontWeight: '800', color: colors.primaryDark },
});
