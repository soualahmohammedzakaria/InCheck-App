import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

interface EventProps {
  event: Event;
}

export default function Event({ event }: EventProps) {
  const router = useRouter();

  const handleEventDetails = () => {
    router.push({
      pathname: '/(routes)/eventdetails',
      params: { event: JSON.stringify(event) },
    });
  };

  return (
    <View
      style={{
        backgroundColor: colors.lightGrey,
        padding: 15,
        borderRadius: 16,
        flexDirection: 'column',
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={handleEventDetails}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center',
          }}
        >
          {event.name}
        </Text>
        <Entypo name="chevron-right" size={28} color={colors.black} />
      </Pressable>
      <View
        style={{
          height: 2,
          width: '99%',
          backgroundColor: colors.grey,
          borderRadius: 20,
          alignSelf: 'center',
          marginVertical: 8,
        }}
      />

      <View style={{ flexDirection: 'column', gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome6 name="location-crosshairs" size={24} color={colors.black} />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              marginLeft: 5,
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            Location: {event.location}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="calendar" size={25} color={colors.black} />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              marginLeft: 5,
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            Date: {event.date}
          </Text>
        </View>
      </View>
    </View>
  );
}