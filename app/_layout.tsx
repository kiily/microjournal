import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, StyleSheet } from 'react-native';
import { getDatabase } from '../src/db/client';
import { seedDatabase } from '../src/db/seed';
import { useAppStore } from '../src/stores/useAppStore';
import { userProfile } from '../src/db/schema';
import type { UserProfile, RoomTier } from '../src/types';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { setProfile } = useAppStore();

  useEffect(() => {
    async function initializeApp() {
      try {
        const db = getDatabase();

        // Run migrations & seed
        await seedDatabase(db);

        // Load user profile
        const profiles = await db.select().from(userProfile).limit(1);
        if (profiles.length > 0) {
          const p = profiles[0];
          setProfile({
            id: p.id,
            displayName: p.displayName,
            avatarConfig: JSON.parse(p.avatarConfig),
            roomTier: p.roomTier as RoomTier,
            onboarded: p.onboarded ?? false,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          });
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    }

    initializeApp();
  }, [setProfile]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#FAF6F1' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="journal" options={{ animation: 'slide_from_left' }} />
        <Stack.Screen name="year-in-pixels" options={{ presentation: 'modal' }} />
        <Stack.Screen name="onboarding/index" options={{ animation: 'fade' }} />
        <Stack.Screen name="habit/new" options={{ presentation: 'modal' }} />
        <Stack.Screen name="habit/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="habit/manage" options={{ presentation: 'modal' }} />
        <Stack.Screen name="focus/index" options={{ animation: 'fade' }} />
        <Stack.Screen name="settings/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="settings/reminders" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="settings/appearance" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="settings/privacy" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
