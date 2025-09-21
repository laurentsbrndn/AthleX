import { db } from "../../config/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

export const setDraftCheckout = async (uid: string, draft: any) => {
  const ref = doc(db, "users", uid, "checkoutDrafts", uid);
  await setDoc(ref, draft);
};

export const getDraftCheckout = async (uid: string) => {
  const ref = doc(db, "users", uid, "checkoutDrafts", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const clearDraftCheckout = async (uid: string) => {
  const ref = doc(db, "users", uid, "checkoutDrafts", uid);
  await deleteDoc(ref);
};

