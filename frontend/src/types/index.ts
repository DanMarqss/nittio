export interface User {
  id: string;
  name: string;
  photo: string;
}

export interface Interaction {
  id: string;
  sender: string;
  receiver: string;
  createdAt: string;
}
