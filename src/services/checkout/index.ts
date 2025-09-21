import { db } from "../../config/firebase";
import { collection, addDoc, doc, serverTimestamp, updateDoc, getDocs } from "firebase/firestore";
import type { CheckoutDataInterface } from "../../types/checkout";

export const createCheckout = async (
  uid: string,
  checkout: Omit<CheckoutDataInterface, "createdAt" | "checkoutId">
) => {
  const userRef = doc(db, "users", uid);
  const checkoutsRef = collection(userRef, "checkouts");

  const newCheckout = {
    ...checkout,
    status: checkout.status || "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(checkoutsRef, newCheckout);

  await updateDoc(docRef, {
    checkoutId: docRef.id,
  });

  return {
    id: docRef.id,
    path: docRef.path,
  };
};

/**
 * READ checkouts by user
 */
export const getUserCheckouts = async (
  uid: string
): Promise<CheckoutDataInterface[]> => {
  const userRef = doc(db, "users", uid);
  const checkoutsRef = collection(userRef, "checkouts");

  const snapshot = await getDocs(checkoutsRef);
  return snapshot.docs.map((docSnap) => ({
    ...docSnap.data(),
    checkoutId: docSnap.id,
  })) as CheckoutDataInterface[];
};
