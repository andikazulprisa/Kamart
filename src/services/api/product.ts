import axios from "axios";

export interface Product {
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

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products');
  const data = await response.json();
  return data;
};

export const getDetailProduct = async (
  id: number,
  callback?: (data: Product | null) => void
): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const product = response.data;
    if (callback) {
      callback(product);
    }
    return product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    if (callback) {
      callback(null);
    }
    return null;
  }
};
