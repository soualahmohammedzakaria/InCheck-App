import axios from "axios";

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
