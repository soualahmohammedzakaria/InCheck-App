import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import FormInput from '@/components/form/FormInput';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '@/components/global/Button';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import axios from 'axios';
import { Toast } from 'react-native-toast-notifications';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      // Attempt to login
      /*const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/auth/login`, {
        username,
        password,
      });*/
      if(true) { // If login is successful
        Toast.show("Logged in successfully, welcome back!", {
          placement: "bottom",
          type: "success",
        })
        router.replace("/(authed)/home");
      } else {
        Toast.show("The credentials you entered are wrong!", {
          placement: "bottom",
        })
      }
    } catch (error) {
      console.error(error);
    }
    router.replace("/(authed)/home");
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white,}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 40,
              gap: 40,
              flex: 1,
            }}
          >
            <View
              style={{
                gap: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}      
            >
              <Text style={{
                fontSize: 40,
                fontWeight: 'bold',
              }}>
                InCheck
              </Text>
              <MaterialIcons name="qr-code-scanner" size={60} color={colors.black} />
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 30,
                width: '100%',
              }}
            >
              <FormInput
                title="Username"
                placeholder="Enter your username"
                value={username}
                onValueChange={setUsername}
              />

              <FormInput
                title="Password"
                placeholder="Enter your password"
                value={password}
                onValueChange={setPassword}
                secureTextEntry
              />
            </View>

            <Button title="Login" onPress={handleSubmit} />

            <Image source={require('@/assets/images/gdg.png')} style={{ width: 100, height: 50, marginTop: 10 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}