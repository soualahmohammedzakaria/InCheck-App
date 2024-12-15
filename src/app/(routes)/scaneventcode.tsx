import { checkIn } from "@/api/api";
import Button from "@/components/global/Button";
import { colors } from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-notifications";

function extractIds(input: string): {
  participant_id: number;
  event_id: number;
} {
  // Use a regular expression to match the IDs
  const regex = /participant_id:(\d+),eventid:(\d+)/;
  const match = input.match(regex);

  if (match) {
    const participant_id = parseInt(match[1], 10);
    const event_id = parseInt(match[2], 10);

    return { participant_id, event_id };
  } else {
    throw new Error();
  }
}

export default function ScanEventCode() {
  const { event_id: id } = useLocalSearchParams();
  const event_id = JSON.parse(id as string);

  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  if (!permission) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.white,
        }}
      >
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView
        style={{
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
          backgroundColor: colors.white,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            marginBottom: 20,
          }}
        >
          Camera access is required to scan codes!
        </Text>
        <Button title="Allow Access" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  async function onBarcodeScanned({ data }: BarcodeScanningResult) {
    if (!scanningEnabled) return;
  
    setScanningEnabled(false);
    Vibration.vibrate();
  
    try {
      const { participant_id, event_id } = extractIds(data);
  
      const participant = await checkIn(participant_id, event_id);
      
      Toast.show(`${participant.first_name} ${participant.last_name} checked successfully!`, {
        placement: "bottom",
        type: "success",
      });
    } catch (error) {
      Toast.show("Failed to validate code. Please try again.", {
        placement: "bottom",
        type: "danger",
      });
    } finally {
      if(!alertDisplayed) {
        setScanningEnabled(true);
        router.back();
        setAlertDisplayed(true);
      }
    }
  }

  return (
    <>
      <SafeAreaView
        style={{
          position: "absolute",
          top: 10,
          left: 15,
          zIndex: 2,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: colors.white,
          }}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={32} color={colors.black} />
        </Pressable>
      </SafeAreaView>
      {scanningEnabled && (
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={onBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      )}
    </>
  );
}