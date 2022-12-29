import { useEffect, useState } from "react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

import axios from "axios";
import { useCartContext, useAuthContext } from "../../contexts/";

import { text } from "../../utils/data/SingleProductData";
import {
  ProductInterface,
  ProductListInt,
  SingleItemOrderInf,
} from "../../ts/";
import {
  SingleProductTop,
  AmountButtons,
  SectionTitle,
  ProductsListSection,
  BreadCrumbs,
} from "../../components";
import { baseURL } from "../../axios";
import ProductHead from "../../components/products/ProductHead";

interface Props {
  product: ProductInterface;
  relatedProducts: ProductListInt[];
}

const SingleProduct: NextPage<Props> = ({ product, relatedProducts }) => {
  const [amount, setAmount] = useState(1);
  const { addToCart } = useCartContext();
  const { user } = useAuthContext();
  const increase = () => {
    setAmount((amount) => {
      let newAmount = amount + 1;
      return newAmount;
    });
  };
  const decrease = () => {
    setAmount((amount) => {
      return amount > 1 ? amount - 1 : 1;
    });
  };

  const addItem = () => {
    const cartItem: SingleItemOrderInf = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      amount,
    };
    addToCart(cartItem);
  };
  useEffect(() => {
    setAmount(1);
  }, [product._id]);

  return (
    <>
      <ProductHead
        dsc={product.short_desc}
        img={product.image}
        name={product.name}
      />
      <div className='lg:p-8 '>
        <BreadCrumbs name={product.name} />
        {user?.role == "admin" || user?.role == "admin" ? (
          <Link href={`/dashboard/products/${product._id}`}>
            <button className='btn-primary !bg-red-300 !ml-auto !block'>
              edit product
            </button>
          </Link>
        ) : (
          <></>
        )}
        <SingleProductTop product={product} />
        <section className='flex flex-col justify-center items-center gap-3'>
          <AmountButtons
            increase={increase}
            decrease={decrease}
            amount={amount}
          />
          <button onClick={addItem} className='btn-primary'>
            Add to cart
          </button>
        </section>
        <div className='flex flex-col gap-[50px] mt-40px]'>
          <SectionTitle title={"Description"} text={product.long_description} />
          <div>
            <SectionTitle title={"Related Products"} text={text} />
            <ProductsListSection productsList={relatedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await axios(`${baseURL}/products/`);

  const paths = data.products.map((item: ProductInterface) => {
    return {
      params: { id: item._id },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id;
  const { data } = await axios(`${baseURL}/products/${id}`);
  const { data: categories } = await axios(
    `${baseURL}/products/?category=${data.category}&limit=5`
  );
  const { data: productsType } = await axios(
    `${baseURL}/products/?type=${data.type}&limit=5`
  );

  const relatedProducts = [
    { id: 2, name: data.type, products: productsType.products },
    { id: 1, name: data.category, products: categories.products },
  ];

  return {
    props: {
      product: data,
      relatedProducts,
    },
    revalidate: 10, // In seconds
  };
};
