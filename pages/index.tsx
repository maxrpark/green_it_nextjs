import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import {
  ProductsListSection,
  Hero,
  GridSection,
  CategoryNavbar,
} from "../components";
import axios from "axios";
import { ProductListInt } from "../ts/";

interface Props {
  products: ProductListInt[];
  categories: string[];
}

const Home: NextPage<Props> = ({ products }) => {
  return (
    <>
      <Hero />
      <CategoryNavbar />
      <GridSection />
      <ProductsListSection productsList={products} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: products } = await axios<ProductListInt[]>(
    `https://green-it-server.onrender.com/api/v1/products/featured/`
  );

  return {
    props: {
      products,
    },
  };
};

export default Home;
