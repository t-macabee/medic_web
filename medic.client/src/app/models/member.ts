import {Roles} from "./roles";

export interface Member {
  id: number,
  name: string,
  username: string,
  dateOfBirth: Date,
  lastLogin: Date,
  orders: number,
  status: string,
  imageUrl: string,
  role: Roles
}
