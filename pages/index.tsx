import type { NextPage } from "next";
import {
  ProductsListSection,
  Hero,
  GridSection,
  CategoryNavbar,
} from "../components";
import axios from "axios";
import { ProductListInt } from "../ts/";
import { baseURL } from "../axios";

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

import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  let products: ProductListInt[] = [];
  try {
    const res = await axios<ProductListInt[]>(`${baseURL}/products/featured/`);
    products = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      products,
    },
    revalidate: 10, // In seconds
  };
};

export default Home;
