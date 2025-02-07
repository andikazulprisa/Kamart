// import React, { ReactNode } from "react";
// import Image from 'next/image';

// interface CardProductProps {
//   children: ReactNode;
// }

// interface CardProductComponent extends React.FC<CardProductProps> {
//   Header: React.FC<HeaderProps>;
//   Body: React.FC<BodyProps>;
//   Footer: React.FC<FooterProps>;
// }

// interface HeaderProps {
//   image: string;
// }

// interface BodyProps {
//   title: string;
//   children: ReactNode;
// }

// interface FooterProps {
//   price: number;
//   id: number;
//   handleAddToCart: (id: number) => void;
// }

// const CardProduct: CardProductComponent = (props) => {
//   const { children } = props;
//   return (
//     <div className="w-full max-w-xs bg-gray-800 border-gray-700 rounded-lg shadow mx-3 my-2 flex flex-col justify-between">
//       {children}
//     </div>
//   );
// };

// const Header: React.FC<HeaderProps> = ({ image }) => (
//     <Image
//       src={image}
//       alt="product"
//       width={300}
//       height={300}
//       className="object-cover" />
// );

// const Body: React.FC<BodyProps> = ({ title, children }) => {
//   const text = typeof children === "string" ? children : "";
//   return (
//     <div className="px-5 pb-5 h-full">
//       <h5 className="text-xl font-semibold tracking-tight text-white">
//         {title}
//       </h5>
//       <p className="text-sm text-white py-5">{text.substring(0, 100)}...</p>
//     </div>
//   );
// };

// const Footer: React.FC<FooterProps> = ({ price, id, handleAddToCart }) => (
//   <div className="flex items-center justify-between px-5 pb-5">
//     <span className="text-xl font-bold text-white">
//       $ {price.toLocaleString("id-ID")}
//     </span>
//     <button className="bg-blue-600" onClick={() => handleAddToCart(id)}>
//       Add To Cart
//     </button>
//   </div>
// );

// CardProduct.Header = Header;
// CardProduct.Body = Body;
// CardProduct.Footer = Footer;

// export default CardProduct;
