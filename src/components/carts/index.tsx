  import { useState, useEffect } from "react";
  import type { CartInterface } from "../../types/carts";
  import { useNavigate } from "react-router-dom";
  import { setDraftCheckout } from "../../services/checkout_draft";

  interface CartsProps {
    items: CartInterface[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    user: any | null;
  }

  export const CartsComponents = ({ items, onUpdateQuantity, onRemove, user }: CartsProps) => {
    const [localItems, setLocalItems] = useState<CartInterface[]>(items);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    useEffect(() => {
      setLocalItems(items);
      const initialSelection: Record<string, boolean> = {};
      items.forEach((it) => {
        initialSelection[it.id] = false;
      });
      setSelected(initialSelection);
    }, [items]);

    const handleQuantity = (id: string, newQty: number) => {
      const item = localItems.find((i) => i.id === id);
      if (!item) return;

      let errorMsg: string | null = null;

      if (newQty < 1) {
        newQty = 1;
        errorMsg = "Minimum quantity is 1";
      } else if (newQty > item.stock) {
        newQty = item.stock;
        errorMsg = `Maximum stock is ${item.stock}`;
      }

      setLocalItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, quantity: newQty } : it))
      );
      setErrors((prev) => ({ ...prev, [id]: errorMsg }));
      onUpdateQuantity(id, newQty);
    };

    const toggleSelect = (id: string) => {
      setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCheckout = async () => {
      const checkoutItems = localItems.filter((it) => selected[it.id]);
      if (checkoutItems.length === 0) return;

      if (!user) {
        alert("Please login first");
        return;
      }

      await setDraftCheckout(user.uid, {
        items: checkoutItems.map(item => ({
          ...item,
          cartDocId: item.id,
        })),
        mode: "cart",
        createdAt: Date.now(),
      });

      navigate("/checkout");
    };

    const totalSelected = localItems
      .filter((it) => selected[it.id])
      .reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {localItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="flex justify-center text-black-400">
              <i className="bi bi-cart text-6xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Your cart is empty</h3>
            <p className="text-gray-500 max-w-md">
              Looks like you haven’t added anything yet.
              <br />
              Let’s explore our products and find something you love!
            </p>
            <a
              href="/products"
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition inline-block"
            >
              Explore Our Products
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="mb-10 text-3xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
              Shopping Cart
            </h2>
            {localItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-6 rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <input
                  type="checkbox"
                  checked={selected[item.id] || false}
                  onChange={() => toggleSelect(item.id)}
                  className="w-5 h-5 text-green-600 accent-green-500"
                />

                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                />

                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    Rp {item.price.toLocaleString()} / item
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 text-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-14 text-center border border-gray-300 rounded-lg py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    <button
                      onClick={() => handleQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 text-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  {errors[item.id] && (
                    <p className="text-red-500 text-xs">{errors[item.id]}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-800 whitespace-nowrap">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 text-xl hover:scale-110 transition-transform"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {localItems.length > 0 && (
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-gray-700 text-lg font-semibold">
              Total Amount:{" "}
              <span className="text-gray-900 font-bold text-xl">
                Rp {totalSelected.toLocaleString()}
              </span>
            </p>

            <button
              onClick={handleCheckout}
              disabled={totalSelected === 0}
              className={`px-6 py-3 rounded-xl font-semibold transition
                ${
                  totalSelected === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    );
  };
