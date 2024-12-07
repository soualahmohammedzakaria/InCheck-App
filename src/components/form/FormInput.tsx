import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors';

interface FormInputProps {
    title: string;
    placeholder: string;
    value: string;
    onValueChange: (text: string) => void;
    secureTextEntry?: boolean;
}

export default function FormInput({ title, placeholder, value, onValueChange, secureTextEntry }: FormInputProps) {
  return (
    <View style={{
        flexDirection: 'column',
        gap: 5,
    }}>
      <Text style={{
        fontSize: 20,
        marginLeft: 5,
        color: colors.black,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
      }}>
        {title}
      </Text>
      <TextInput 
        style={{
            fontSize: 16,
            borderRadius: 16,
            backgroundColor: colors.lightGrey,
            color: colors.black,
            padding: 14,
            height: 50,
            fontFamily: 'Poppins-Medium',
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onValueChange}
        secureTextEntry={secureTextEntry ? true : false}
        placeholderTextColor="darkgray"
      />
    </View>
  )
}