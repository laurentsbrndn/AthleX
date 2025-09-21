import { useState, useEffect } from "react";
import { ProductDetail } from "../../components/product_detail";
import { LoginModal } from "../../components/modal/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

export const ProductDetailPage = () => {
  const [activeModal, setActiveModal] = useState<"login" | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ProductDetail
        user={user}
        onLoginRequired={() => setActiveModal("login")}
      />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        onSwitchToRegister={() => console.log("switch")}
      />
    </>
  );
};
