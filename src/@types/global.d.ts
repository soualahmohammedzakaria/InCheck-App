type User = {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
};

type ParticipantStatus = {
  participant: User;
  status: string;
};

type GDGEvent = {
  id: number;
  name: string;
  location: string;
  date: Date;
};

type Admin = {
  id: number;
  name: string;
  username: string;
};
