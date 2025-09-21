import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { ProfileInterface } from "../../types/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data() as ProfileInterface);
      } else {
        const newProfile: ProfileInterface = {
          uid: user.uid,
          email: user.email || "",
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
        };
        await setDoc(ref, newProfile);
        setProfile(newProfile);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const updateProfile = async (data: ProfileInterface) => {
    setProfile(data);
    await setDoc(doc(db, "users", data.uid), data, { merge: true });
  };

  return { profile, loading, updateProfile };
};
