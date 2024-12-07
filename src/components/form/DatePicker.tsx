import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Button from '../global/Button';
import { colors } from '@/constants/colors';

interface DatePickerProps {
  title: string;
  value: Date;
  onValueChange: (date: Date) => void;
}

export default function DatePicker({ title, value, onValueChange }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      onValueChange(selectedDate);
    }
  };

  const formattedDate = value.toLocaleDateString();
  const formattedTime = value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginLeft: 5,
          color: colors.black,
          fontWeight: 'bold',
          fontFamily: 'Poppins-SemiBold',
        }}
      >
        {title}
      </Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{
          borderRadius: 16,
          backgroundColor: colors.lightGrey,
          padding: 14,
          height: 50,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: value ? colors.black : 'darkgray',
            fontSize: 16,
          }}
        >
          {value ? `${formattedDate} ${formattedTime}` : 'Select date and time'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <>
          <DateTimePicker
            value={value}
            mode="datetime"
            minimumDate={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
          />
          <Button title="Done" onPress={() => setShowPicker(false)} />
        </>
      )}
    </View>
  );
}