import React from "react";

interface HeaderProps {
  image: string;
}

interface BodyProps {
  title: string;
  children: React.ReactNode;
}

interface FooterProps {
  price: number;
  id: number;
  handleAddToCart: (id: number) => void;
}

interface CardProductProps {
  children: React.ReactNode;
}

interface CardProductComponent extends React.FC<CardProductProps> {
  Header: React.FC<HeaderProps>;
  Body: React.FC<BodyProps>;
  Footer: React.FC<FooterProps>;
}

const CardProduct: CardProductComponent = ({ children }) => (
  <div className="w-full max-w-xs bg-gray-800 border-gray-700 rounded-lg shadow mx-3 my-2 flex flex-col justify-between">
    {children}
  </div>
);

const CardHeader = ({ image }: { image: string }) => {
  return (
    <div className="relative h-48">
      <img
        src={image}
        alt="product"
        className="object-cover rounded-t-lg w-full h-full"
      />
    </div>
  );
};

const Body: React.FC<BodyProps> = ({ title, children }) => {
  const text = typeof children === "string" ? children : "";
  return (
    <div className="p-5">
      <h5 className="text-xl font-semibold tracking-tight text-white">
        {title}
      </h5>
      <p className="mt-2 text-sm text-gray-400">{text}</p>
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({ price, id, handleAddToCart }) => (
  <div className="flex items-center justify-between px-5 pb-5">
    <span className="text-xl font-bold text-white">
      $ {price.toLocaleString("id-ID")}
    </span>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded"
      onClick={() => handleAddToCart(id)}
    >
      Add To Cart
    </button>
  </div>
);

CardProduct.Header = CardHeader;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
