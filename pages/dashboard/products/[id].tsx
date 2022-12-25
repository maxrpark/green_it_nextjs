import { useState, useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next";
import axios from "axios";

import { ProductInterface } from "../../../ts/";
import { ProfileLayout } from "../../../components/layout";
import { CustomBtn, SingleProductForm } from "../../../components";
import { useAdminContext } from "../../../contexts/";
import { baseURL } from "../../../axios";

interface Props {
  product: ProductInterface;
}

const SingleProduct: NextPage<Props> = ({ product }) => {
  const [singleProduct, setSingleProduct] = useState(product);
  const { selectedProduct, setSelectedProduct, deleteProduct, isUploading } =
    useAdminContext();

  useEffect(() => {
    setSelectedProduct(product);
    setSingleProduct(selectedProduct as ProductInterface);
  }, []);

  return (
    <ProfileLayout>
      <div className='lg:p-8 '>
        <div className='flex gap-4'>
          <CustomBtn path={"/dashboard/products"} />
          <CustomBtn path={`/products/${product._id}`} text='preview' />
          <button
            onClick={() => deleteProduct(selectedProduct._id!)}
            className='btn-primary mb-4 capitalize !block !bg-red-600 !text-white'
            disabled={isUploading}
          >
            Delete
          </button>
        </div>
        <SingleProductForm
          product={selectedProduct ? selectedProduct : product}
        />
      </div>
    </ProfileLayout>
  );
};

export default SingleProduct;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;

  let productData;

  try {
    const { data } = await axios(`${baseURL}/products/${id}`, {
      withCredentials: true,
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });
    productData = data;
  } catch (error: any) {
    console.log(error.response);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      product: productData,
    },
  };
};
