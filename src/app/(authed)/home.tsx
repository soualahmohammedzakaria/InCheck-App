import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/home/Header';
import Event from '@/components/home/Event';
import { ScrollView } from 'react-native';
import { colors } from '@/constants/colors';

const events = [
  {
    id: 1,
    name: 'DevFest 2024',
    date: '12/12/2024 - 10:00',
    location: 'ESI Algiers (ex. INI)',
  },
  {
    id: 2,
    name: 'GDG Algiers Meetup',
    date: '12/12/2025 - 10:00',
    location: 'ESI Algiers (ex. INI)',
  },
  {
    id: 3,
    name: 'DevFest 2026',
    date: '12/12/2026 - 10:00',
    location: 'ESI Algiers (ex. INI)',
  },
];

export default function Home() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
      }}
    >
      <Header />
      <ScrollView
        contentContainerStyle={{
          gap: 5,
        }}
      >
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}