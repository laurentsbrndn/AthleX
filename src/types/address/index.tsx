import type { Timestamp } from "firebase/firestore";

export interface AddressInterface {
  id: string;       
  name: string;
  street: string;
  postal_code: string;
  district: string;
  city: string;
  province: string;
  country: string;
  createdAt?: Timestamp; 
  updatedAt?: Timestamp;
}
