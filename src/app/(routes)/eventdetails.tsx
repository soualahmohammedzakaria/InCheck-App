import { getParticipantsByEvent } from "@/api/api";
import Button from "@/components/global/Button";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/utils";
import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventDetails() {
  const { event: paramsEvent } = useLocalSearchParams();
  const event = JSON.parse(paramsEvent as string);
  const eventId = event.id;

  const {
    data: participants,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryFn: () => getParticipantsByEvent(event.id),
    queryKey: ["getParticipants", { eventId }],
  });

  const [participantsFilter, setParticipantsFilter] = useState("");
  const [filtredParticipants, setfiltredParticipants] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setfiltredParticipants(participants);
    }
  }, [participants]);

  const filterParticipants = (newValue: string) => {
    setParticipantsFilter(newValue);
    setfiltredParticipants(
      participants.filter((participant: ParticipantStatus) =>
        `${participant.participant.first_name.toLowerCase()} ${participant.participant.last_name.toLowerCase()}`.includes(
          newValue.toLowerCase()
        )
      )
    );
  };

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
        className="flex-1 justify-center items-center"
      ></ActivityIndicator>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
          {event.name}
        </Text>
      </Pressable>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
          height: "auto",
          marginBottom: 40,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome6
            name="location-crosshairs"
            size={24}
            color={colors.black}
          />
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              marginLeft: 5,
              flexShrink: 1,
              flexWrap: "wrap",
            }}
          >
            Location: {event.location}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="calendar"
            size={25}
            color={colors.black}
          />
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              marginLeft: 5,
              flexShrink: 1,
              flexWrap: "wrap",
            }}
          >
            Date: {formatDate(event.date)}
          </Text>
        </View>
        <Button
          title="Start Check-In"
          onPress={() =>
            router.push({
              pathname: "/(routes)/scaneventcode",
              params: { event_id: event.id.toString() },
            })
          }
          disabled={event.date < new Date()}
        />

        <SearchBar
          placeholder="Search Participant"
          onChangeText={filterParticipants}
          value={participantsFilter}
          inputStyle={{
            color: colors.black,
            fontFamily: "Poppins-Medium",
          }}
          containerStyle={{
            backgroundColor: colors.white,
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            paddingHorizontal: 0,
          }}
          inputContainerStyle={{
            backgroundColor: colors.lightGrey,
            borderRadius: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold" }}>
            Participant
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold" }}>
            Status
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: colors.black,
            borderRadius: 20,
            alignSelf: "center",
            marginVertical: -4,
          }}
        />
        <View
          style={{
            height: "auto",
          }}
        >
          {filtredParticipants.map((participant: ParticipantStatus) => (
            <View
              key={participant.participant.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "Poppins-SemiBold" }}>
                {participant.participant.first_name}{" "}
                {participant.participant.last_name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-SemiBold",
                  color:
                    participant.status === "present"
                      ? "green"
                      : participant.status === "absent"
                      ? "red"
                      : colors.black,
                }}
              >
                {participant.status.charAt(0).toLocaleUpperCase() +
                  participant.status.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}