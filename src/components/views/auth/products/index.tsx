import React, { useState, useEffect, useRef } from "react";
import CardProduct from "@/components/fragments/CardProduct";
import { getProducts } from "@/pages/api/product/product";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

interface CartItem {
  id: number;
  qty: number;
}

const ProductsPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  //   const [email, setEmail] = useState<string>("");
  const cartRef = useRef(cart);

  // Sync cart state with ref
  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  // Initialize cart and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart);
            setCart(parsedCart);
          } catch (error) {
            console.error("Error parsing cart:", error);
            setCart([]);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Cart handlers
  const handleAddToCart = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    setCart((prevCart) => {
      const newCart = prevCart.find((item) => item.id === id)
        ? prevCart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prevCart, { id, qty: 1 }];

      // Save immediately after update
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleQtyChange = (id: number, increment: boolean) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: increment ? item.qty + 1 : Math.max(item.qty - 1, 1),
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Merge cart with product data
  const cartItems = cart
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return product ? { ...product, qty: cartItem.qty } : null;
    })
    .filter((item) => item !== null) as (Product & { qty: number })[];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  //   const handleLogout = () => {
  //     localStorage.removeItem("access_token");
  //     window.location.href = "/login";
  //   };

  return (
    <>
      {/* <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
        {email && <span className="mr-4">{email}</span>}
        <button className="bg-black px-4 py-2 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div> */}

      <div className="flex justify-center py-5">
        {/* Product List */}
        <div className="w-4/6 flex flex-wrap gap-4">
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

        {/* Cart Section */}
        <div className="w-2/6 pl-6">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <span>${item.price}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-gray-600 px-2 py-1 rounded"
                          onClick={() => handleQtyChange(item.id, false)}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          className="bg-gray-600 px-2 py-1 rounded"
                          onClick={() => handleQtyChange(item.id, true)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="bg-red-600 text-white px-1.5 py-1 rounded"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
