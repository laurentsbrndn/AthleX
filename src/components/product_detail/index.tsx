import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductActions } from "../product_actions";
import { getProductById } from "../../services/products";
import type { ProductsInterface } from "../../types/products";

interface ProductDetailProps {
  user: any;
  onLoginRequired: () => void;
}

export const ProductDetail = ({ user, onLoginRequired }: ProductDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductsInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getProductById(id);
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        {product.imageURL && (
          <img
            src={product.imageURL}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded-lg"
          />
        )}
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

        <p className="text-green-600 text-3xl font-semibold mb-4">
          Rp {product.price.toLocaleString()}
        </p>

        <p className="text-gray-700 mb-4">{product.description}</p>

        <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
        <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>

        <div className="mt-auto border-t pt-4">
          <ProductActions product={product} user={user} onLoginRequired={onLoginRequired} />
        </div>
      </div>
    </div>
);
};
