import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { productsFetch } from "../../axios";
import { ProductInterface } from "../../ts/";
import {
  CategoriesButtons,
  TypesButtons,
  ProductsList,
  BreadCrumbs,
  SearchInput,
} from "../../components";
import { useProductsContext } from "../../contexts";

interface Props {
  productsList: ProductInterface[];
  totalProducts: number;
  totalNumberOfPages: number;
  query: string;
}

const Products: NextPage<Props> = ({
  productsList,
  totalNumberOfPages,
  query,
}) => {
  const {
    products,
    filters,
    productsPageInitialData,
    setFilterOnLoad,
    updateFilters,
  } = useProductsContext();

  const formSubmitFunc = async (value: string) => {
    setFilterOnLoad({ name: "name", value });
    updateFilters({ name: "name", value });
  };

  useEffect(() => {
    productsPageInitialData({ totalNumberOfPages, productsList });
    if (query) {
      setFilterOnLoad({ name: "name", value: query });
    }
  }, []);

  if (!products) {
    return <h2>Loading</h2>;
  }
  return (
    <>
      <BreadCrumbs />
      <div className='flex flex-col lg:grid grid-cols-product-layout justify-between gap-10 lg:gap-24 mb-20'>
        <div className='flex flex-col gap-8 lg:gap-4 lg:mb-5'>
          <SearchInput formSubmitFunc={formSubmitFunc} value={filters.name} />
          <CategoriesButtons />
          <TypesButtons />
        </div>
        <ProductsList />
      </div>
    </>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx.query;

  let querySearch = "";
  let data = [];
  if (query) {
    const res = await productsFetch(`/?page=1&limit=12&name=${query}`);
    data = res.data;
    querySearch = query as string;
  } else {
    const res = await productsFetch("/?page=1&limit=12");
    data = res.data;
  }

  return {
    props: {
      productsList: data.products,
      totalProducts: data.totalProducts,
      totalNumberOfPages: data.numberOfPages,
      query: querySearch,
    },
  };
};
