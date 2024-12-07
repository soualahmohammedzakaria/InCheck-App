import Button from '@/components/global/Button';
import { colors } from '@/constants/colors';
import { Entypo } from '@expo/vector-icons';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Vibration, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScanEventCode() {
  const { event_id: id } = useLocalSearchParams();
  const event_id = JSON.parse(id as string);

  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);

  if (!permission) {
    return(
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.white,
        }}
      >
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    )
  }

  if (!permission.granted) {
    return(
      <SafeAreaView
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
          backgroundColor: colors.white,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 20,
          }}
        >Camera access is required to scan codes!</Text>
        <Button title='Allow Access' onPress={requestPermission}/>
      </SafeAreaView>
    )
  }

  async function onBarcodeScanned({ data }: BarcodeScanningResult) {
    if (!scanningEnabled) return;

    try {
      Vibration.vibrate();
      setScanningEnabled(false);

      Alert.alert('Success', "Code validated successfully!", [
        { text: 'Ok', onPress: () => setScanningEnabled(true) },
      ]);

    } catch (error) {
      Alert.alert('Error', "Failed to validate code. Please try again.");
      setScanningEnabled(true);
    }
    finally {
        router.back();
    }
  }

  return (
    <>
        <SafeAreaView
            style={{
                position: 'absolute',
                top: 10,
                left: 15,
                zIndex: 2,
            }}
        >
            <Pressable
                style={{ padding: 10, borderRadius: 50, backgroundColor: colors.white }}
                onPress={() => router.back()}
            >
                <Entypo name="chevron-left" size={32} color={colors.black} />
            </Pressable>
        </SafeAreaView>
        <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={onBarcodeScanned}
        barcodeScannerSettings={{
            barcodeTypes: ["qr"],
        }}
        />
    </>
  );
}