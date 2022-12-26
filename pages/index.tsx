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

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
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
  };
};

export default Home;
