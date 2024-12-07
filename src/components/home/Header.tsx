import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors } from '@/constants/colors'

export default function Header() {
  return (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
        }}
    >
      <Text
        style={{
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
        }}
      >
        InCheck
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/(routes)/addevent")}
      >
        <FontAwesome5 name="calendar-plus" size={30} color={colors.black} />
      </TouchableOpacity>
    </View>
  )
}