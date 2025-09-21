import { useState, useEffect } from "react";
import { TransactionHistoryComponents } from "../../components/transaction_history";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { Loading } from "../../utility/loading";

export const TransactionHistoryPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <Loading text="Loading transactions..." />;
  }

  return <TransactionHistoryComponents user={user} />;
};
