import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { productImages } from '../assets/images/products';

const { width } = Dimensions.get('window');

export default function PathfindingScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeStep, setActiveStep] = useState(1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#111827' }]} edges={['top', 'bottom']}>
      {/* Top Direction Banner (Sketch: Path finding - Follow the path (10m straight)) */}
      <View style={styles.topDirectionBanner}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.directionInfo}>
          <View style={styles.directionIconCircle}>
            <Ionicons name="arrow-up" size={22} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.directionTitle}>Follow the path (10m straight)</Text>
            <Text style={styles.directionSub}>Turn left at Aisle 2 toward Canned & Instant Foods</Text>
          </View>
        </View>
      </View>

      {/* 3D Supermarket Map Graphic */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/images/pathfinding_map.png')}
          style={styles.mapGraphic}
          resizeMode="cover"
        />

        {/* Animated User Location Radar Pulse */}
        <View style={[styles.userPulseRing, { top: '65%', left: '46%' }]}>
          <View style={styles.userPulseDot} />
        </View>

        {/* Destination Target Marker on Shelf 1 */}
        <View style={[styles.destinationMarker, { top: '38%', left: '52%' }]}>
          <View style={[styles.targetBubble, { backgroundColor: colors.primary }]}>
            <Ionicons name="basket" size={14} color="#FFFFFF" />
            <Text style={styles.targetBubbleText}>Shelf 1</Text>
          </View>
          <View style={styles.targetTriangle} />
        </View>
      </View>

      {/* Target Item Bottom Card (Sketch: Maggi / Shelf 1 / 30s away) */}
      <View style={styles.bottomCardWrapper}>
        <View style={[styles.targetCard, { backgroundColor: theme.surface }]}>
          <Image
            source={productImages['p-maggi']}
            style={styles.targetItemImage}
            resizeMode="contain"
          />

          <View style={styles.targetMeta}>
            <Text style={[styles.targetItemName, { color: theme.text }]}>Maggi 2-Minute Noodles</Text>
            <View style={styles.shelfRow}>
              <View style={[styles.shelfBadge, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="location" size={12} color={colors.primary} />
                <Text style={styles.shelfBadgeText}>Shelf 1 • Row B</Text>
              </View>
              <Text style={[styles.etaText, { color: colors.primaryDark }]}>⚡ 30s away</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.foundBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(tabs)/cart')}
          >
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topDirectionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    backgroundColor: '#1F2937',
  },
  backBtn: { padding: 4 },
  directionInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  directionIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  directionSub: { color: '#9CA3AF', fontSize: 11, marginTop: 2 },
  mapContainer: { flex: 1, position: 'relative' },
  mapGraphic: { width: '100%', height: '100%' },
  userPulseRing: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(34, 164, 93, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPulseDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  destinationMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  targetBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  targetBubbleText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  targetTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
  },
  bottomCardWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  targetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    gap: 12,
  },
  targetItemImage: { width: 56, height: 56 },
  targetMeta: { flex: 1 },
  targetItemName: { fontSize: 14, fontWeight: '800' },
  shelfRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  shelfBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  shelfBadgeText: { fontSize: 10, fontWeight: '800', color: colors.primaryDark },
  etaText: { fontSize: 11, fontWeight: '800' },
  foundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
