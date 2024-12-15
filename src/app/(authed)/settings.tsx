import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Toast } from 'react-native-toast-notifications';

export default function Settings() {
  const router = useRouter();

  const handleLogout = () => {
    Toast.show("Logged out successfully!", {
      placement: "bottom",
      type: "success",
    });
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: colors.black,
            paddingHorizontal: 14,
            height: 50,
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              alignItems: 'center',
              justifyContent: 'center',
              }}
          >Logout</Text>
          <MaterialIcons name="exit-to-app" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontSize: 30,
    padding: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },
  optionsContainer: {
    gap: 10,
    marginHorizontal: 23,
  }
});