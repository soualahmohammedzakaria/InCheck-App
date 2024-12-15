import axios from "axios";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";

const BASE_URL = `${process.env.EXPO_PUBLIC_SERVER_URI}`;

export const getEvents = async () => {
  const url = `${BASE_URL}/event/events/`;

  console.log("Fetching events");

  const { data } = await axios.get(url);
  return data;
};

export const getParticipants = async () => {
  const url = `${BASE_URL}/event/participants/`;

  console.log("Fetching participants");

  const { data } = await axios.get(url);
  return data;
};

export const addEvent = async (
  name: string,
  location: string,
  date: Date,
  invitees: number[]
) => {
  const url = `${BASE_URL}/event/events/`;
  const event = {
    name: name,
    location: location,
    date: date,
  };

  const { data } = await axios.post(url, event);
  await addParticipants(data.id, invitees);
  return data;
};

export const addParticipants = async (eventId: number, invitees: number[]) => {
  const url = `${BASE_URL}/event/events/${eventId}/add-participants/`;
  const body = {
    participant_ids: invitees,
  };

  const { data } = await axios.post(url, body);
  return data;
};

export const getParticipantsByEvent = async (eventId: number) => {
  const url = `${BASE_URL}/event/events/${eventId}/participants/`;

  console.log("Fetching participants");

  const { data } = await axios.get(url);
  return data;
};

export const handleAuthentication = async (username: string, password: string) => {
  router.replace("/(authed)/home");
  return ;
  try {
    // Attempt to login
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    if (response.status === 200) {
      // If login is successful
      Toast.show("Logged in successfully, welcome back!", {
        placement: "bottom",
        type: "success",
      });
      router.replace("/(authed)/home");
    } else if (response.status === 401) {
      // Invalid Credentials
      Toast.show("Invalid Credentials", {
        placement: "bottom",
        type: "danger",
      });
    } else {
      // Other errors
      Toast.show("There was an error", {
        placement: "bottom",
        type: "danger",
      });
    }
  } catch (error) {
    console.error(error);
    Toast.show("There was an error", {
      placement: "bottom",
      type: "danger",
    });
  }
};