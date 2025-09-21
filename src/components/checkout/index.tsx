import { useEffect, useState } from "react";
import { createCheckout } from "../../services/checkout";
import type { CheckoutDataInterface, CheckoutItem } from "../../types/checkout";
import { AddressManagement } from "../modal/address_management";
import { getDraftCheckout, clearDraftCheckout } from "../../services/checkout_draft";
import { useNavigate } from "react-router-dom";
import { getFirestore, deleteDoc, collection, getDocs, Timestamp, doc } from "firebase/firestore";

interface CheckoutComponentsProps {
  user: any;
}

export const CheckoutComponents = ({ user }: CheckoutComponentsProps) => {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [_mode, setMode] = useState<"buyNow" | "cart">("cart");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    if (!user) return;
    const loadDraft = async () => {
      const draft = await getDraftCheckout(user.uid);
      if (draft) {
        setCart(draft.items);
        setTotal(draft.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0));
        setMode(draft.mode);
      } else {
        navigate("/carts");
      }
    };
    loadDraft();
  }, [user, navigate]);

  const handleCheckout = async () => {
    if (!user || !address) {
      alert("Please login & choose address");
      return;
    }

    const items: CheckoutItem[] = cart.map((item) => ({
      cartDocId: item.id, 
      id: item.productId || item.id,      
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      stock: item.stock,
      imageURL: item.imageURL,
    }));

    try {
      const checkoutRef = doc(collection(db, "users", user.uid, "checkouts"));
      const checkoutId = checkoutRef.id; 
      const orderId = `${checkoutId}-${user.uid}`

      const checkout: CheckoutDataInterface = {
        userId: user.uid,
        total,
        shippingAddress: address,
        status: "pending",
        createdAt: Timestamp.now(),
        orderId,
        items,
      };

      await createCheckout(user.uid, checkout);

      const payload = {
        order_id: orderId,
        gross_amount: total,
        customer: {
          first_name: user.displayName?.split(" ")[0] || "Guest",
          last_name: user.displayName?.split(" ")[1] || "",
          email: user.email,
          phone: user.phoneNumber || "",
          address,
          city: "",
          postal_code: "",
        },
        items: cart.map(item => ({
          // id: item.id,
          id: item.productId,
          price: item.price,
          quantity: item.quantity,
          name: item.name,
        })),
      };

      console.log("💡 DEBUG - Payload sent to createTransaction:", payload);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/createTransaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      console.log("💡 DEBUG - Response from createTransaction:", json);

      const { token } = json;

      (window as any).snap.pay(token, {
        onSuccess: async (result: any) => {
          console.log("💡 SUCCESS", result);
          try {
            const snapDocs = await getDocs(collection(db, "users", user.uid, "carts"));
            const itemsToDelete = new Set(checkout.items.map(it => it.cartDocId));
            await Promise.all(
              snapDocs.docs.map(async d => {
                if (itemsToDelete.has(d.id)) {
                  console.log("Deleting:", d.id);
                  await deleteDoc(d.ref);
                }
              })
            );
            console.log("Selected items deleted from cart.");
            await clearDraftCheckout(user.uid);
            navigate("/transaction-success");
          } catch (err) {
            console.error("Error removing selected items from cart:", err);
          }
        },
        onPending: (result: any) => console.log("💡 PENDING", result),
        onError: (result: any) => console.log("💡 ERROR", result),
        onClose: () => console.log("💡 CLOSED"),
      });

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to process checkout");
    }
  };

  useEffect(() => {
  if (typeof window === "undefined") return; 

  const script = document.createElement("script");
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";

  const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  if (!clientKey) {
    console.error("VITE_MIDTRANS_CLIENT_KEY is not defined");
    return;
  }

  script.setAttribute("data-client-key", clientKey);
  script.async = true;

  script.onload = () => console.log("Midtrans Snap loaded");

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl border border-gray-200"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 text-lg">{item.name}</h2>
                <p className="text-sm text-gray-500 mb-2">Qty: {item.quantity}</p>
                <p className="text-gray-800 font-semibold">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

          <div className="flex justify-between mb-4 text-gray-800 font-semibold text-lg border-t pt-3">
            <span>Total Amount</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Shipping Address</label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
              >
                Select
              </button>
            </div>

            {selectedAddress && (
              <p className="mt-2 text-sm text-gray-600">
                Selected address: <span className="font-semibold">{selectedAddress}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleCheckout}
            disabled={!address}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>

      <AddressManagement
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        uid={user.uid}
        onSelectAddress={(addr) => {
          const fullAddress = `${addr.street}, ${addr.district}, ${addr.city}, ${addr.province}, ${addr.postal_code}, ${addr.country}`;
          setAddress(fullAddress);
          setSelectedAddress(fullAddress);
        }}
      />
    </div>
  );
};
