import { GetServerSideProps } from "next";
import { getProducts } from "@/services/api/product";
import ProductView from "@/components/views/products";
import Head from "next/head";

const ProductPage = ({ products }) => {
  return (
    <>
      <Head>
        <title>Product Page</title>
      </Head>
      <div>
        <h1>All Products</h1>
        {/* Render produk di sini */}
      </div>
      <ProductView />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
};

export default ProductPage;
