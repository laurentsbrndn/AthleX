import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { CartInterface } from "../../types/carts";
import { getCarts, updateCartQuantity, removeCartItem } from "../../services/carts";

export const useCart = () => {
  const [carts, setCarts] = useState<CartInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCarts([]);
        setLoading(false);
        return;
      }

      try {
        const data = await getCarts(user.uid);
        setCarts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const updateQuantity = async (id: string, quantity: number) => {
    const user = getAuth().currentUser;
    if (!user) return;
    await updateCartQuantity(user.uid, id, quantity);
    setCarts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = async (id: string) => {
    const user = getAuth().currentUser;
    if (!user) return;
    await removeCartItem(user.uid, id);
    setCarts((prev) => prev.filter((item) => item.id !== id));
  };


  return { carts, loading, updateQuantity, removeItem };
};
