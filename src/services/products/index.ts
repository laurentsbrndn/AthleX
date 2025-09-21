import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { ProductsInterface } from "../../types/products";

export const getProducts = async (): Promise<ProductsInterface[]> => {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((doc) => ({
    productId: doc.id, // ✅ match interface
    ...(doc.data() as Omit<ProductsInterface, "productId">),
  }));
};

export const getProductById = async (id: string): Promise<ProductsInterface | null> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;

  return {
    productId: docSnap.id, // ✅ use id, not productId
    ...(docSnap.data() as Omit<ProductsInterface, "productId">),
  };
};
