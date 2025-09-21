import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import type { AddressInterface } from "../../types/address";

export const getUserAddresses = async (uid: string): Promise<AddressInterface[]> => {
  const colRef = collection(db, "users", uid, "address");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((docSnap) => ({
    ...(docSnap.data() as Omit<AddressInterface, "id">),
    id: docSnap.id,
  }));
};

export const addUserAddress = async (
  uid: string,
  data: Omit<AddressInterface, "id" | "createdAt" | "updatedAt">
): Promise<void> => {
  const docRef = doc(collection(db, "users", uid, "address"));
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateUserAddress = async (
  uid: string,
  id: string,
  data: Partial<Omit<AddressInterface, "id" | "createdAt" | "updatedAt">>
): Promise<void> => {
  const docRef = doc(db, "users", uid, "address", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteUserAddress = async (uid: string, id: string): Promise<void> => {
  const docRef = doc(db, "users", uid, "address", id);
  await deleteDoc(docRef);
};
