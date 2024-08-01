import {Roles} from "./roles";

export interface User {
  id: number;
  name: string;
  dateOfBirth: string;
  lastLogin: string;
  orders: number;
  imageUrl: string;
  status: string;
  role: Roles;
  username: string;
  token: string;
}
