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
  category: string;
}

const CategoryPage: React.FC<Props> = ({
  productsList,
  totalNumberOfPages,
  category,
}) => {
  const { productsPageInitialData, setFilterOnLoad } = useProductsContext();

  useEffect(() => {
    productsPageInitialData({ totalNumberOfPages, productsList });
    setFilterOnLoad({ name: "category", value: category });
  }, [category]);

  return (
    <div>
      <BreadCrumbs />
      <h1 className='main-title text-center !mb-16 text-[56px] font-bold '>
        {category}
      </h1>
      <section className='w-full flex justify-center'>
        <ProductsList />
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await axios(`${baseURL}/products/`);
  const categories = data.products.map(
    (product: ProductInterface) => product.category
  );

  const paths = ([...new Set(categories)] as string[]).map((item) => {
    return {
      params: { category: item },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const category = ctx.params?.category;
  const { data } = await axios(
    `${baseURL}/products/?category=${category}&page=1&limit=12`
  );

  return {
    props: {
      category,
      productsList: data.products,
      totalProducts: data.totalProducts,
      totalNumberOfPages: data.numberOfPages,
    },
  };
};

export default CategoryPage;
