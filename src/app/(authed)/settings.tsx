import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    // Style your options container similar to other screens
  },
  option: {
    padding: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    color: colors.white,
    fontSize: 16,
  },
});