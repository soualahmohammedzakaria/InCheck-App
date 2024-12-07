import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
        style={{
            borderRadius: 16,
            backgroundColor: disabled ? colors.lightGrey : colors.black,
            paddingHorizontal: 14,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
    >
        <Text
            style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
            }}
        >{disabled && "🚫"} {title}</Text>
    </TouchableOpacity>
  )
}