import { useState, useEffect } from "react";
import type { ProductsInterface } from "../../types/products";
import { addOrUpdateCart, getCarts } from "../../services/carts";
import { QuantitySelector } from "../quantity_selector";
import type { CartInterface } from "../../types/carts";
import { useNavigate } from "react-router-dom";
import { setDraftCheckout } from "../../services/checkout_draft";

interface ProductActionsProps {
  product: ProductsInterface;
  user: any;
  onLoginRequired: () => void;
}

export const ProductActions = ({ product, user, onLoginRequired }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [currentInCart, setCurrentInCart] = useState(0);
  const [loading, setLoading] = useState<"cart" | "buy" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const carts: CartInterface[] = await getCarts(user.uid);
      const existing = carts.find((item) => item.id === product.productId);
      setCurrentInCart(existing ? existing.quantity : 0);
    };
    load();
  }, [user, product.productId]);

  const handleAddToCart = async () => {
    if (!user) return onLoginRequired();

    if (quantity + currentInCart > product.stock) {
      const maxCanAdd = product.stock - currentInCart;
      setError(
        maxCanAdd > 0
          ? `You can only add ${maxCanAdd} more item(s). Stock limit reached.`
          : `You already reached the maximum stock (${product.stock}).`
      );
      return;
    }

    setLoading("cart");
    setError(null);
    try {
      await addOrUpdateCart(user.uid, {
        id: product.productId,
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.stock,
        imageURL: product.imageURL || "",
      });
      setCurrentInCart((prev) => prev + quantity);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };
  
  const handleBuy = async () => {
    if (!user) return onLoginRequired();

    if (quantity > product.stock) {
      setError("Quantity exceeds available stock.");
      return;
    }

    setLoading("buy");
    setError(null);

    try {
      const buyNowItem = {
        id: product.productId,
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.stock,
        imageURL: product.imageURL || "",
      };

      await setDraftCheckout(user.uid, {
        mode: "buyNow",
        items: [buyNowItem],
        createdAt: Date.now(),
      });

      navigate("/checkout");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <QuantitySelector
        stock={product.stock}
        onChange={setQuantity}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={loading === "cart"}
          className={`border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold transition duration-100
            ${loading === "cart" ? "opacity-50 cursor-not-allowed" : "hover:bg-green-50"}
          `}
        >
          {loading === "cart" ? "Adding..." : "Add to Cart"}
        </button>

        <button
          onClick={handleBuy}
          disabled={loading === "buy"}
          className={`bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition duration-100
            ${loading === "buy" ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}
          `}
        >
          {loading === "buy" ? "Processing..." : "Buy"}
        </button>
      </div>
    </div>
  );
};
