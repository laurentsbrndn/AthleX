import { db } from "../../config/firebase";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import type { CartInterface } from "../../types/carts";

export const getCarts = async (uid: string): Promise<CartInterface[]> => {
  const ref = collection(db, "users", uid, "carts");
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<CartInterface, "id">),
  }));
};

export const addOrUpdateCart = async (
  uid: string,
  item: CartInterface
) => {
  const ref = doc(db, "users", uid, "carts", item.id);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    const current = existing.data() as CartInterface;
    const newQty = Math.min(current.quantity + item.quantity, item.stock);

    await setDoc(
      ref,
      { ...current, quantity: newQty, stock: item.stock },
      { merge: true }
    );
  } else {
    const newQty = Math.min(item.quantity, item.stock);

    await setDoc(
      ref,
      { ...item, quantity: newQty },
      { merge: true }
    );
  }
};

export const updateCartQuantity = async (uid: string, id: string, quantity: number) => {
  const ref = doc(db, "users", uid, "carts", id);
  await setDoc(ref, { quantity }, { merge: true });
};

export const removeCartItem = async (uid: string, id: string) => {
  const ref = doc(db, "users", uid, "carts", id);
  await deleteDoc(ref);
};
