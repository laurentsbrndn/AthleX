import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { User } from "firebase/auth";

export const createUserDocIfNotExists = async (
  user: User,
  extraData?: {
    firstName?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
  }
) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      firstName: extraData?.firstName || null,
      lastName: extraData?.lastName || null,
      gender: extraData?.gender || null,
      dob: extraData?.dob || null,
      createdAt: new Date(),
    });
  }
};
