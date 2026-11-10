import React from 'react';
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

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.content}>
        {/* Top Logo */}
        <View style={styles.topHeader}>
          <View style={[styles.logoIconBox, { backgroundColor: colors.primary }]}>
            <Ionicons name="basket" size={26} color="#FFFFFF" />
          </View>
          <Text style={[styles.appName, { color: theme.text }]}>FreshMart</Text>
        </View>

        {/* Hero Artwork */}
        <View style={styles.heroWrapper}>
          <Image
            source={require('../assets/images/banner_offer.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Headlines & Features */}
        <View style={styles.headlineBox}>
          <Text style={[styles.mainHeadline, { color: theme.text }]}>
            Groceries Delivered in 1 Hour or Shop In-Store
          </Text>
          <Text style={[styles.subHeadline, { color: theme.subText }]}>
            Navigate aisles with smart shelf pathfinding, get cashback up to 30%, and enjoy contactless delivery.
          </Text>
        </View>

        {/* CTA Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>Start Shopping</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  logoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
  },
  heroImage: { width: width * 0.8, height: '100%' },
  headlineBox: { alignItems: 'center' },
  mainHeadline: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subHeadline: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  bottomSection: { marginBottom: 12 },
  startBtn: {
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  startBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
