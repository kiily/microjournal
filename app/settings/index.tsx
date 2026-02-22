import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { eq } from 'drizzle-orm';
import { getDatabase } from '../../src/db/client';
import { userProfile } from '../../src/db/schema';
import { useAppStore } from '../../src/stores/useAppStore';
import { SETTINGS } from '../../src/constants/copy';

export default function SettingsScreen() {
  const { profile, updateDisplayName } = useAppStore();
  const [name, setName] = useState(profile?.displayName ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveName = async () => {
    if (!profile?.id || !name.trim()) return;
    setIsSaving(true);
    try {
      const db = getDatabase();
      await db
        .update(userProfile)
        .set({ displayName: name.trim(), updatedAt: new Date().toISOString() })
        .where(eq(userProfile.id, profile.id));
      updateDisplayName(name.trim());
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={22} color="#2C2420" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scroll}>
        {/* Profile section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{SETTINGS.name}</Text>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              onBlur={handleSaveName}
              returnKeyType="done"
              onSubmitEditing={handleSaveName}
              testID="settings-name-input"
            />
          </View>
        </View>

        {/* Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Reminders</Text>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => router.push('/settings/reminders')}
            testID="settings-reminders-button"
          >
            <Text style={styles.rowLabel}>{SETTINGS.reminders}</Text>
            <Ionicons name="chevron-forward" size={16} color="#B8ADA4" />
          </TouchableOpacity>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Appearance</Text>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => router.push('/settings/appearance')}
          >
            <Text style={styles.rowLabel}>{SETTINGS.appearance}</Text>
            <Ionicons name="chevron-forward" size={16} color="#B8ADA4" />
          </TouchableOpacity>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Privacy</Text>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => router.push('/settings/privacy')}
          >
            <Text style={styles.rowLabel}>{SETTINGS.privacy}</Text>
            <Ionicons name="chevron-forward" size={16} color="#B8ADA4" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nook v1.0.0</Text>
          <Text style={styles.footerText}>Made with care · Nook Labs</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E0D8',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#2C2420',
    textAlign: 'center',
  },
  spacer: { width: 40 },
  scroll: { flex: 1 },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B7D72',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FAF6F1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0EAE2',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0EAE2',
  },
  rowLabel: {
    fontSize: 15,
    color: '#2C2420',
  },
  nameInput: {
    fontSize: 15,
    color: '#8B7D72',
    textAlign: 'right',
    minWidth: 120,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#B8ADA4',
  },
});
