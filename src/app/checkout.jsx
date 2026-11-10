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
import { colors, radius, useTheme } from '../theme';
import { deliveryAddresses } from '../data';

export default function CheckoutScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Steps: 1: Delivery, 2: Address, 3: Payment, 4: Success
  const [currentStep, setCurrentStep] = useState(1);

  const [deliveryType, setDeliveryType] = useState('express');
  const [selectedAddress, setSelectedAddress] = useState('addr-home');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryOptions = [
    {
      id: 'reguler',
      title: 'Regular Delivery',
      desc: 'Order will be delivered between in the time slots available (Tomorrow 9am - 12pm)',
      icon: 'time-outline',
      fee: 'Free',
    },
    {
      id: 'express',
      title: 'Express Delivery',
      desc: 'Items will be delivered in 2-3 hours if the order is placed before 6pm.',
      icon: 'flash-outline',
      fee: '₹20',
    },
    {
      id: 'pickup',
      title: 'In-Store Pickup',
      desc: 'Pre-pay and pick up directly from More Mega Store customer desk.',
      icon: 'bag-check-outline',
      fee: 'Free',
    },
  ];

  const paymentOptions = [
    { id: 'card', title: 'Debit / Credit Card', icon: 'card-outline', color: '#1E2022' },
    { id: 'paytm', title: 'Paytm Wallet & UPI', icon: 'wallet-outline', color: '#00BAF2' },
    { id: 'phonepe', title: 'PhonePe UPI', icon: 'phone-portrait-outline', color: '#5F259F' },
    { id: 'cod', title: 'Cash on Delivery', icon: 'cash-outline', color: '#22A45D' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(4); // Success!
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          onPress={() => (currentStep > 1 && currentStep < 4 ? setCurrentStep(currentStep - 1) : router.back())}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {currentStep < 4 && (
        /* Stepper Header (Sketch: Delivery > Address > Payment) */
        <View style={[styles.stepperRow, { backgroundColor: theme.surface }]}>
          {[
            { step: 1, label: 'Delivery' },
            { step: 2, label: 'Address' },
            { step: 3, label: 'Payment' },
          ].map((s) => (
            <View key={s.step} style={styles.stepItem}>
              <View
                style={[
                  styles.stepNumberCircle,
                  currentStep >= s.step ? { backgroundColor: colors.primary } : { backgroundColor: theme.inputBg },
                ]}
              >
                <Text style={[styles.stepNumberText, { color: currentStep >= s.step ? '#FFFFFF' : theme.subText }]}>
                  {s.step}
                </Text>
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  { color: currentStep >= s.step ? theme.text : theme.subText, fontWeight: currentStep === s.step ? '800' : '500' },
                ]}
              >
                {s.label}
              </Text>
            </View>
          ))}
        </View>
      )}

      {currentStep === 1 && (
        /* Step 1: Delivery Options */
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Choose Delivery Mode</Text>
          {deliveryOptions.map((opt) => {
            const isSelected = deliveryType === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionCard,
                  { backgroundColor: theme.surface, borderColor: isSelected ? colors.primary : theme.cardBorder },
                  isSelected && { borderWidth: 2, backgroundColor: colors.primarySoft },
                ]}
                onPress={() => setDeliveryType(opt.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIconBox, { backgroundColor: isSelected ? colors.primary : theme.inputBg }]}>
                  <Ionicons name={opt.icon} size={20} color={isSelected ? '#FFFFFF' : theme.text} />
                </View>
                <View style={styles.optionMeta}>
                  <View style={styles.optTitleRow}>
                    <Text style={[styles.optionTitle, { color: theme.text }]}>{opt.title}</Text>
                    <Text style={[styles.feeText, { color: colors.primaryDark }]}>{opt.fee}</Text>
                  </View>
                  <Text style={[styles.optionDesc, { color: theme.subText }]}>{opt.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {currentStep === 2 && (
        /* Step 2: Address Options */
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Select Delivery Address</Text>
          {deliveryAddresses.map((addr) => {
            const isSelected = selectedAddress === addr.id;
            return (
              <TouchableOpacity
                key={addr.id}
                style={[
                  styles.optionCard,
                  { backgroundColor: theme.surface, borderColor: isSelected ? colors.primary : theme.cardBorder },
                  isSelected && { borderWidth: 2, backgroundColor: colors.primarySoft },
                ]}
                onPress={() => setSelectedAddress(addr.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIconBox, { backgroundColor: isSelected ? colors.primary : theme.inputBg }]}>
                  <Ionicons name="home-outline" size={20} color={isSelected ? '#FFFFFF' : theme.text} />
                </View>
                <View style={styles.optionMeta}>
                  <Text style={[styles.optionTitle, { color: theme.text }]}>{addr.title}</Text>
                  <Text style={[styles.optionDesc, { color: theme.subText }]}>{addr.address}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[styles.addAddressBtn, { borderColor: colors.primary }]}
            onPress={() => Alert.alert('Add Address', 'Address picker opening...')}
          >
            <Ionicons name="add" size={18} color={colors.primary} />
            <Text style={[styles.addAddressText, { color: colors.primaryDark }]}>+ Add New Address</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {currentStep === 3 && (
        /* Step 3: Payment Options (Sketch: Payment options - Pay Now) */
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Select Payment Method</Text>
          {paymentOptions.map((pay) => {
            const isSelected = paymentMethod === pay.id;
            return (
              <TouchableOpacity
                key={pay.id}
                style={[
                  styles.optionCard,
                  { backgroundColor: theme.surface, borderColor: isSelected ? colors.primary : theme.cardBorder },
                  isSelected && { borderWidth: 2, backgroundColor: colors.primarySoft },
                ]}
                onPress={() => setPaymentMethod(pay.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIconBox, { backgroundColor: isSelected ? colors.primary : theme.inputBg }]}>
                  <Ionicons name={pay.icon} size={20} color={isSelected ? '#FFFFFF' : pay.color} />
                </View>
                <View style={styles.optionMeta}>
                  <Text style={[styles.optionTitle, { color: theme.text }]}>{pay.title}</Text>
                </View>
                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={isSelected ? colors.primary : theme.subText}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {currentStep === 4 && (
        /* Order Confirmed Screen */
        <View style={styles.successContainer}>
          <View style={[styles.successCircle, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="checkmark-circle" size={72} color={colors.primary} />
          </View>
          <Text style={[styles.successTitle, { color: theme.text }]}>Order Placed!</Text>
          <Text style={[styles.successSub, { color: theme.subText }]}>
            Your grocery order from More Mega Store has been confirmed. Estimated delivery time: 45 minutes.
          </Text>

          <View style={[styles.orderCodeCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
            <Text style={[styles.orderCodeLabel, { color: theme.subText }]}>ORDER ID</Text>
            <Text style={[styles.orderCodeValue, { color: colors.primary }]}>ORD-91240</Text>
          </View>

          <TouchableOpacity
            style={[styles.continueShoppingBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(tabs)/orders')}
          >
            <Text style={styles.continueShoppingText}>Track Order</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep < 4 && (
        <View style={[styles.bottomBar, { backgroundColor: theme.surface, borderTopColor: theme.divider }]}>
          <View>
            <Text style={[styles.subLabel, { color: theme.subText }]}>Total to Pay</Text>
            <Text style={[styles.totalPrice, { color: colors.primaryDark }]}>₹105</Text>
          </View>

          <TouchableOpacity
            style={[styles.nextActionBtn, { backgroundColor: colors.primary }]}
            onPress={handleNext}
          >
            <Text style={styles.nextActionText}>
              {currentStep === 3 ? 'Pay Now' : 'Continue'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepNumberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: { fontSize: 12, fontWeight: '800' },
  stepLabel: { fontSize: 11 },
  scrollContent: { padding: 16, gap: 12 },
  sectionHeading: { fontSize: 15, fontWeight: '800', marginBottom: 4 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  optionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionMeta: { flex: 1 },
  optTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionTitle: { fontSize: 14, fontWeight: '800' },
  feeText: { fontSize: 12, fontWeight: '800' },
  optionDesc: { fontSize: 12, marginTop: 4, lineHeight: 16 },
  addAddressBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    gap: 6,
    marginTop: 8,
  },
  addAddressText: { fontSize: 13, fontWeight: '800' },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  subLabel: { fontSize: 11, fontWeight: '600' },
  totalPrice: { fontSize: 18, fontWeight: '900' },
  nextActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radius.full,
    gap: 6,
  },
  nextActionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: { fontSize: 24, fontWeight: '900', marginBottom: 8 },
  successSub: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  orderCodeCard: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 28,
  },
  orderCodeLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  orderCodeValue: { fontSize: 20, fontWeight: '900', marginTop: 2 },
  continueShoppingBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueShoppingText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
