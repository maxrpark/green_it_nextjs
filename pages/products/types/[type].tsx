import { useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { BreadCrumbs, ProductsList } from "../../../components";
import { useProductsContext } from "../../../contexts/useProductsContext";

import { ProductInterface } from "../../../ts/";
import { baseURL } from "../../../axios";

interface Props {
  productsList: ProductInterface[];
  totalProducts: number;
  totalNumberOfPages: number;
  type: string;
}

const CategoryPage: React.FC<Props> = ({
  productsList,
  totalNumberOfPages,
  type,
}) => {
  const { productsPageInitialData, setFilterOnLoad } = useProductsContext();

  useEffect(() => {
    productsPageInitialData({ totalNumberOfPages, productsList });
    setFilterOnLoad({ name: "category", value: type });
  }, []);

  return (
    <>
      <BreadCrumbs />
      <h1 className='main-title text-center !mb-16 text-[56px] font-bold '>
        {type}
      </h1>
      <section className='w-full flex justify-center'>
        <ProductsList />
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await axios(`${baseURL}/products/`);
  const types = data.products.map((product: ProductInterface) => product.type);

  const paths = ([...new Set(types)] as string[]).map((item) => {
    return {
      params: { type: item },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const type = ctx.params?.type;
  const { data } = await axios(
    `${baseURL}/products/?type=${type}&page=1&limit=12`
  );

  return {
    props: {
      type,
      productsList: data.products,
      totalProducts: data.totalProducts,
      totalNumberOfPages: data.numberOfPages,
    },
    revalidate: 10, // In seconds
  };
};

export default CategoryPage;
