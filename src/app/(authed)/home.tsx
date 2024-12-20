import { getEvents } from "@/api/api";
import Event from "@/components/home/Event";
import Header from "@/components/home/Header";
import { colors } from "@/constants/colors";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Current Route:", pathname);
  }, [pathname]);

  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: getEvents,
    queryKey: ["getEvents"],
  });

  if (error) {
    return (
      <View className="flex-1 justify-center px-6">
        <Text className="text-black text-center text-3xl mb-6">
          {error.message}
        </Text>
        <Button title="Reload" onPress={() => refetch()} disabled={false} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        size={90}
        className="flex-1 justify-center items-center bg-white"
      ></ActivityIndicator>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
      }}
    >
      <Header />

      {events?.length !== 0 ? (
        <ScrollView
          contentContainerStyle={{
            gap: 5,
          }}
        >
          {events?.map((event: GDGEvent) => (
            <Event key={event.id} event={event} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center">
          <Text style={{fontFamily: "Poppins-SemiBold"}} className="text-black text-center text-3xl">
            Add some events
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
