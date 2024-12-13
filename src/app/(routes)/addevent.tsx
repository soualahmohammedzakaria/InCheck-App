import AddInvitee from "@/components/form/AddInvitee";
import DatePicker from "@/components/form/DatePicker";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/global/Button";
import { colors } from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const users: User[] = [
  {
    id: 1,
    name: "Soualah Mohammed Zakaria",
    email: "mz_soualahmohammed@esi.dz",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: 3,
    name: "Alice Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: 4,
    name: "Bob Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: 5,
    name: "Charlie Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: 6,
    name: "David Doe",
    email: "johndoe@gmail.com",
  },
];

export default function AddEvent() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [invitees, setInvitees] = useState<Number[]>([]);

  const handleSubmit = () => {};

  function onDateChange(date?: Date) {
    setDate(date || new Date());
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
          }}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={32} color={colors.black} />
          <Text style={{ fontSize: 24, fontFamily: "Poppins-SemiBold" }}>
            Add an event
          </Text>
        </Pressable>
        <View style={{ flex: 1, padding: 20, gap: 40 }}>
          <View
            style={{
              flexDirection: "column",
              gap: 30,
              width: "100%",
            }}
          >
            <FormInput
              title="Name"
              placeholder="Enter event name"
              value={name}
              onValueChange={setName}
            />

            <FormInput
              title="Location"
              placeholder="Enter event location"
              value={location}
              onValueChange={setLocation}
            />

            <DatePicker
              title="Date"
              value={date}
              onValueChange={onDateChange}
            />
          </View>

          <AddInvitee users={users} onInvite={setInvitees} />

          <Button title="Add Event" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
