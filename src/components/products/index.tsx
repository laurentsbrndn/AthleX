import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import type { ProductsInterface } from "../../types/products";

interface ProductsComponentProps {
  filterFn?: (products: ProductsInterface[]) => ProductsInterface[];
}

export const ProductsComponent = ({ filterFn }: ProductsComponentProps) => {
  const [productsList, setProductsList] = useState<ProductsInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProductsList(data);
    };
    fetchData();
  }, []);

  const finalProducts = filterFn ? filterFn(productsList) : productsList;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {finalProducts.map((product) => (
        <Link
          key={product.productId}
          to={`/products/${product.productId}`}
          className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-200"
        >
          {product.imageURL && (
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-48 object-contain rounded-lg mb-3"
            />
          )}
          <h1 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-green-600 font-bold text-xl mb-3">
            Rp {product.price.toLocaleString()}
          </p>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="font-bold">{product.brand}</span>
            <span>Stock: {product.stock}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
