import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function Header({
  searchPlaceholder = 'Search Items/Stores',
  searchValue,
  onSearchChange,
  onFilterPress,
}) {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={[styles.brandIconBox, { backgroundColor: colors.primary }]}>
            <Ionicons name="basket" size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={[styles.appName, { color: theme.text }]}>FreshMart</Text>
            <Text style={[styles.appLocation, { color: theme.subText }]}>Bangalore • Bellandur</Text>
          </View>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.inputBg }]}
            onPress={toggleTheme}
          >
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={18} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.inputBg }]}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="cart-outline" size={18} color={theme.text} />
            <View style={[styles.cartBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={[styles.searchBox, { backgroundColor: theme.inputBg }]}>
        <Ionicons name="search" size={18} color={theme.subText} />
        <TextInput
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder={searchPlaceholder}
          placeholderTextColor={theme.subText}
          style={[styles.searchInput, { color: theme.text }]}
        />
        <TouchableOpacity onPress={onFilterPress} style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  appLocation: {
    fontSize: 11,
    fontWeight: '600',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterBtn: {
    padding: 4,
  },
});
