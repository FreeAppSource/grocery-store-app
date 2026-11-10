import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { userProfile } from '../../data';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const menuList = [
    { id: 'm-addr', title: 'Shipping Address', icon: 'location-outline', subtitle: 'Home & Office' },
    { id: 'm-ord', title: 'Order History', icon: 'receipt-outline', subtitle: 'View all orders' },
    { id: 'm-notif', title: 'Notification', icon: 'notifications-outline', subtitle: 'Offers & tracking' },
    { id: 'm-cards', title: 'Cards & Payment', icon: 'card-outline', subtitle: 'Paytm, UPI, Cards' },
    { id: 'm-path', title: 'In-Store Pathfinding Guide', icon: 'navigate-outline', subtitle: 'Smart shelf locator' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of FreshMart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/') },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card (Sketch: Sanjeev Gupta / Edit Profile) */}
        <View style={[styles.userCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <Image
            source={require('../../assets/images/avatar_user.png')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>{userProfile.name}</Text>
            <Text style={[styles.userEmail, { color: theme.subText }]}>{userProfile.email}</Text>
            <TouchableOpacity onPress={() => Alert.alert('Edit Profile', 'Profile editor opening...')}>
              <Text style={[styles.editProfileText, { color: colors.primary }]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={[styles.menuCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          {menuList.map((item, idx) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => {
                  if (item.id === 'm-ord') router.push('/(tabs)/orders');
                  else if (item.id === 'm-path') router.push('/pathfinding');
                  else Alert.alert(item.title, `Opening ${item.title}...`);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name={item.icon} size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, { color: theme.text }]}>{item.title}</Text>
                    <Text style={[styles.menuSub, { color: theme.subText }]}>{item.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color={theme.subText} />
              </TouchableOpacity>
              {idx < menuList.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.divider }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Log Out */}
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: '#FEE2E2' }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.accentRed} />
          <Text style={[styles.logoutText, { color: colors.accentRed }]}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingVertical: 12 },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 16, gap: 16 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  userInfo: { flex: 1, marginLeft: 14 },
  userName: { fontSize: 16, fontWeight: '800' },
  userEmail: { fontSize: 12, marginTop: 2, marginBottom: 4 },
  editProfileText: { fontSize: 12, fontWeight: '700' },
  menuCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: { fontSize: 14, fontWeight: '700' },
  menuSub: { fontSize: 11, marginTop: 2 },
  divider: { height: 1, width: '100%' },
  logoutBtn: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  logoutText: { fontSize: 14, fontWeight: '800' },
});
