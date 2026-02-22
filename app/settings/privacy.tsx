import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase } from '../../src/db/client';
import { moodEntry, habitLog, userProfile } from '../../src/db/schema';

export default function PrivacyScreen() {
  const handleExportData = async () => {
    try {
      const db = getDatabase();
      const moods = await db.select().from(moodEntry);
      const logs = await db.select().from(habitLog);
      const profile = await db.select().from(userProfile).limit(1);

      const exportData = JSON.stringify({ profile: profile[0], moods, logs }, null, 2);

      // In production, use expo-sharing to share the file
      Alert.alert(
        'Export ready',
        `Your data (${moods.length} mood entries, ${logs.length} habit logs) is ready to export.`,
        [{ text: 'OK' }],
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to export data.');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset all data',
      'This permanently deletes all your entries, habits, and room progress. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#2C2420" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Your data</Text>

          <TouchableOpacity
            style={styles.navRow}
            onPress={handleExportData}
            testID="export-data-button"
          >
            <View>
              <Text style={styles.rowLabel}>Export my data</Text>
              <Text style={styles.rowSubtext}>Download as JSON</Text>
            </View>
            <Ionicons name="download-outline" size={18} color="#8B7D72" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Danger zone</Text>

          <TouchableOpacity style={styles.destructiveRow} onPress={handleReset}>
            <Text style={styles.destructiveLabel}>Reset all data</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          All your data is stored locally on your device. Nook never sends your journal entries to any server.
        </Text>
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
  content: { padding: 20, gap: 16 },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B7D72',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#FAF6F1',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0EAE2',
  },
  rowLabel: { fontSize: 15, color: '#2C2420' },
  rowSubtext: { fontSize: 12, color: '#8B7D72', marginTop: 2 },
  destructiveRow: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0EAE2',
  },
  destructiveLabel: { fontSize: 15, color: '#E05A3A' },
  note: {
    fontSize: 13,
    color: '#B8ADA4',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 8,
  },
});
