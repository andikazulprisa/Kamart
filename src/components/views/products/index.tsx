import { FC, useEffect, useState } from "react";
import CardProduct from "@/components/views/products/Card";
import { getProducts } from "@/services/api/product";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category?: {
    id: number;
    name: string;
    image: string;
  };
}

const ProductView: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filterPrice, setFilterPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleAddToCart = (id: number) => {
    console.log("Add to cart", id);
  };

  return (
    <div className="flex pt-16">
      <aside className="w-64 bg-gray-100 p-4 h-screen fixed left-0 top-16 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-1">
            Filter by Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="Enter price"
            value={filterPrice !== null ? filterPrice : ""}
            onChange={(e) => setFilterPrice(Number(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price-range" className="block font-medium mb-1">
            Filter by Price Range
          </label>
          <div className="flex space-x-2">
            <input
              id="minPrice"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border border-gray-300 rounded p-2 w-1/2"
            />
            <input
              id="maxPrice"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border border-gray-300 rounded p-2 w-1/2"
            />
          </div>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-4">
        <h1 className="text-3xl mb-4">All Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <CardProduct key={product.id}>
              <CardProduct.Header image={product.images[0]} />
              <CardProduct.Body title={product.title}>
                {product.description}
              </CardProduct.Body>
              <CardProduct.Footer
                price={product.price}
                id={product.id}
                handleAddToCart={handleAddToCart}
              />
            </CardProduct>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductView;
