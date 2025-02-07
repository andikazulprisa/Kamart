import ProductView from "@/components/views/products";
import Head from "next/head";

const ProductPage = () => {
  return (
    <>
      <Head>
        <title>Product Page</title>
      </Head>
      <ProductView />
    </>
  );
};

export default ProductPage;
