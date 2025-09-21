import { useEffect, useState } from "react";
import { CartsComponents } from "../../components/carts";
import { useCart } from "../../hooks/carts";
import { Loading } from "../../utility/loading";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export const CartsPage = () => {
  const { carts, loading, updateQuantity, removeItem } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || authLoading) {
    return <Loading text="Loading carts..." />;
  }

  return (
    <CartsComponents
      items={carts}
      onUpdateQuantity={updateQuantity}
      onRemove={removeItem}
      user={user}
    />
  );
};
