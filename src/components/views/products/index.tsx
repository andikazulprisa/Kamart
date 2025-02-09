import React, { useEffect, useState } from "react";
import CardProduct from "@/components/views/products/Card";
import { getProducts } from "@/services/api/product";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

const ProductView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (id: number) => {
    console.log(`Product ${id} added to cart`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex pt-20">
      <aside className="w-64 bg-gray-200 p-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-4">Filter</h3>
          
          {/* Filter by Title */}
          <div className="mb-6">
            <label htmlFor="searchTitle" className="block mb-2 font-semibold">
              Search Title
            </label>
            <input
              type="text"
              id="searchTitle"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Search products..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>

          {/* Filter by Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="space-y-2">
              <div>
                <label htmlFor="minPrice" className="block mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  className="w-full border border-gray-300 rounded p-2"
                  value={minPrice ?? ''}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  className="w-full border border-gray-300 rounded p-2"
                  value={maxPrice ?? ''}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Filter by Category */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="others">Others</option>
            </select>
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
