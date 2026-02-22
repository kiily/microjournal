import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const REMINDER_HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function RemindersScreen() {
  const [enabled, setEnabled] = useState(true);
  const [reminderHour, setReminderHour] = useState(20); // 8 PM default

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}:00 ${period}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#2C2420" />
        </TouchableOpacity>
        <Text style={styles.title}>Reminders</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowLabel}>Daily reminder</Text>
              <Text style={styles.rowSubtext}>
                {enabled ? formatHour(reminderHour) : 'Off'}
              </Text>
            </View>
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ true: '#D4845A', false: '#E8E0D8' }}
              thumbColor="#FFFFFF"
              testID="reminder-toggle"
            />
          </View>
        </View>

        {enabled && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Reminder time</Text>
            <View style={styles.timeGrid}>
              {[8, 12, 17, 20, 21, 22].map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[
                    styles.timeButton,
                    reminderHour === hour && styles.timeButtonActive,
                  ]}
                  onPress={() => setReminderHour(hour)}
                  testID={`reminder-time-${hour}`}
                >
                  <Text
                    style={[
                      styles.timeText,
                      reminderHour === hour && styles.timeTextActive,
                    ]}
                  >
                    {formatHour(hour)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.note}>
          Nook sends gentle reminders — never guilt-inducing. If you're away for 7+ days, we'll go quiet until you're ready.
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
    padding: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B7D72',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: { fontSize: 15, color: '#2C2420', fontWeight: '500' },
  rowSubtext: { fontSize: 13, color: '#8B7D72', marginTop: 2 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#E8E0D8',
    backgroundColor: '#FAF6F1',
  },
  timeButtonActive: { borderColor: '#D4845A', backgroundColor: '#F2DDD0' },
  timeText: { fontSize: 14, color: '#8B7D72' },
  timeTextActive: { color: '#D4845A', fontWeight: '600' },
  note: {
    fontSize: 13,
    color: '#B8ADA4',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
