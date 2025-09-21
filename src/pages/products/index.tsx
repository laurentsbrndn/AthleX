import { useState } from "react";
import { ProductsComponent } from "../../components/products";
import type { ProductsInterface } from "../../types/products";
import { ProductsSearch } from "../../components/products_search";
import { ProductsFilter } from "../../components/products_filter";

export const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Strength Machine", "Cardio Machine", "Bodyweight Equipment", "Strength Equipment"];

  const filterProducts = (products: ProductsInterface[]) => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      {/* 🔍 Search Bar */}
      <ProductsSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* 🏷️ Category Filter */}
      <ProductsFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 🛒 Products List */}
      <ProductsComponent filterFn={filterProducts} />
    </div>
  );
};

