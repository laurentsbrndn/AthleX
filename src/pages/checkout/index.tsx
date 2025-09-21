import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { CheckoutComponents } from "../../components/checkout";
import { Loading } from "../../utility/loading";

export const CheckoutPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loading text="Checking user session..." />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="mb-4 text-lg">You need to login before checkout</p>
        <a
          href="/login"
          className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }
  return <CheckoutComponents user={user} />;
}
