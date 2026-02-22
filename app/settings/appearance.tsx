import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppearanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#2C2420" />
        </TouchableOpacity>
        <Text style={styles.title}>Appearance</Text>
        <View style={styles.spacer} />
      </View>
      <View style={styles.content}>
        <View style={styles.premiumCard}>
          <Text style={styles.premiumBadge}>Nook Plus</Text>
          <Text style={styles.premiumTitle}>Customize your room</Text>
          <Text style={styles.premiumBody}>
            Change wall colors, floor materials, window views, and avatar outfits.
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade to Nook Plus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F1' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E0D8',
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: 17, fontWeight: '600', color: '#2C2420', textAlign: 'center' },
  spacer: { width: 40 },
  content: { padding: 20 },
  premiumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    gap: 12,
    borderWidth: 2,
    borderColor: '#D4845A',
  },
  premiumBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4845A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  premiumTitle: { fontSize: 20, fontWeight: '600', color: '#2C2420' },
  premiumBody: { fontSize: 14, color: '#8B7D72', lineHeight: 22 },
  upgradeButton: {
    backgroundColor: '#D4845A',
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  upgradeText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
});
