import { GetServerSideProps } from "next";
import { NextPage } from "next/types";
import { productsFetch } from "../../../axios";
import { useEffect } from "react";
import { ProductInterface } from "../../../ts/";
import {
  CategoriesButtons,
  PaginationButtons,
  SectionHeader,
  SingleDetailRow,
  TypesButtons,
  SearchInput,
} from "../../../components";
import { ProfileLayout } from "../../../components/layout";
import { useProductsContext } from "../../../contexts";
import CustomBtn from "../../../components/ui/CustomBtn";

interface Props {
  productsList: ProductInterface[];
  totalProducts: number;
  totalNumberOfPages: number;
}

const AdminProductsPage: NextPage<Props> = ({
  productsList,
  totalNumberOfPages,
  totalProducts,
}) => {
  const {
    products,
    filters,
    productsPageInitialData,
    productsPagination,
    setFilterOnLoad,
  } = useProductsContext();

  const { categories, updateFilters } = useProductsContext();

  const formSubmitFunc = async (value: string) => {
    setFilterOnLoad({ name: "name", value });
    updateFilters({ name: "name", value });
  };

  useEffect(() => {
    productsPageInitialData({
      totalNumberOfPages,
      productsList,
    });
  }, []);
  return (
    <ProfileLayout>
      <div className='w-full'>
        <div className='flex flex-wrap justify-start items-centter '>
          <CustomBtn
            text='create product'
            path={"/dashboard/products/create-product"}
          />
          <div className='mb-6 w-full'>
            <SearchInput formSubmitFunc={formSubmitFunc} value={filters.name} />
          </div>
        </div>
        <div className='flex flex-col gap-8 lg:gap-4 lg:mb-5'>
          <CategoriesButtons />
          <TypesButtons />
        </div>
        <div className='w-full shadow-lg'>
          <SectionHeader
            mainTitle='name'
            detailsOne='price'
            detailsTwo='stock'
          />

          {products.map((product) => {
            return (
              <SingleDetailRow
                key={product._id}
                mainTitle={product.name}
                detailsOne={`$${product.price}`}
                detailsTwo={product.stock}
                img={product.image}
                url={`/dashboard/products/${product._id!}`}
              />
            );
          })}
        </div>
        {totalProducts > 0 ? (
          <PaginationButtons paginationFunction={productsPagination} />
        ) : (
          <h2>No Products found</h2>
        )}
      </div>
    </ProfileLayout>
  );
};

export default AdminProductsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await productsFetch("/?page=1&limit=12");

  return {
    props: {
      productsList: data.products,
      totalProducts: data.totalProducts,
      totalNumberOfPages: data.numberOfPages,
    },
  };
};
