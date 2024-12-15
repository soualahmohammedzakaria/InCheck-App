import { colors } from "@/constants/colors";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

interface DatePickerProps {
  title: string;
  value: Date;
  onValueChange: (date: Date) => void;
}

export default function DatePicker({
  title,
  value,
  onValueChange,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      // Only call onValueChange when the user actually selects a date
      onValueChange(selectedDate);
    }
    setShowPicker(false);
  };

  const formattedDate = value.toLocaleDateString();

  return (
    <View
      style={{
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginLeft: 5,
          color: colors.black,
          fontWeight: "bold",
          fontFamily: "Poppins-SemiBold",
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
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            color: value ? colors.black : "darkgray",
            fontSize: 16,
          }}
        >
          {value ? `${formattedDate}` : "Select date"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <>
          <DateTimePicker
            value={value}
            mode="date"
            minimumDate={new Date()}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
          />
        </>
      )}
    </View>
  );
}
