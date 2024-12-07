import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors'

export default function Settings() {
  return (
    <SafeAreaView
        style={{
            flex: 1,
            padding: 20,
            backgroundColor: colors.white,
        }}
    >
      <Text>Settings</Text>
    </SafeAreaView>
  )
}