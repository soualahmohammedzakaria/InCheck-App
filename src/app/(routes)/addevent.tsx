import { addEvent, getParticipants } from "@/api/api";
import AddInvitee from "@/components/form/AddInvitee";
import DatePicker from "@/components/form/DatePicker";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/global/Button";
import { colors } from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-notifications";

export default function AddEvent() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [invitees, setInvitees] = useState<number[]>([]);
  const [allMembers, setAllMembers] = useState(true);
  const queryClient = new QueryClient();

  console.log("Invitees", invitees);

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function onDateChange(date?: Date) {
    setDate(date || new Date());
  }

  async function handleSubmit() {
    if (name && location && invitees.length !== 0) {
      try {
        await addEventMutation();
        router.replace("/home");
      } catch (error) {
        Toast.show("Error please try again", {
          placement: "bottom",
          type: "failure",
        });
        console.error(error);
      }
    } else {
      Toast.show("Please fill out all the fields, and select participants", {
        placement: "bottom",
        type: "failure",
      });
    }
  }

  function handleConfirm() {
    setAllMembers(true);
  }

  const {
    mutateAsync: addEventMutation,
    isPending,
    data: event,
  } = useMutation({
    mutationFn: () => addEvent(name, location, date, invitees),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEvents"] });
    },
  });

  const {
    data: users,
    isLoading,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryFn: getParticipants,
    queryKey: ["getParticipants"],
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess) {
      setInvitees(users.map((user: User) => user.id));
    }
  }, [users]);

  if (error) {
    return (
      <View className="flex-1 justify-center px-6">
        <Text className="text-black text-center text-3xl mb-6">
          {error.message}
        </Text>
        <Button title="Reload" onPress={refetch} disabled={false} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        size={90}
        className="flex-1 justify-center items-center"
      ></ActivityIndicator>
    );
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
          {allMembers && (
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
          )}

          <AddInvitee
            users={users}
            onInvite={setInvitees}
            invitees={invitees}
            onChangeSelectionMode={setAllMembers}
            allMembers={allMembers}
          />

          {!keyboardOpen && allMembers && !isPending && (
            <Button title="Add Event" onPress={handleSubmit} />
          )}

          {isPending && (
            <ActivityIndicator
              size={40}
              className="flex-1 justify-center items-center"
            ></ActivityIndicator>
          )}

          {!allMembers && (
            <Button title="Confirm Users" onPress={handleConfirm} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
