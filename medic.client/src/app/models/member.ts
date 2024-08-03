import {Roles} from "./roles";
import {Photo} from "./photo";

export interface Member {
  id: number;
  username: string;
  photoUrl: string;
  name: string;
  dateOfBirth: Date;
  lastLogin: Date;
  orders: number;
  status: string;
  role: Roles;
  photos: Photo[];
}
