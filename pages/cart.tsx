import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { CartProducts, Steps, CartTotals } from "../components";
import { useCartContext } from "../contexts";
import Link from "next/link";

const CartPage: NextPage = () => {
  const { cart } = useCartContext();
  const [isSSR, setIsSSR] = useState(true); // todo

  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) {
    return <h2>Loading</h2>;
  }
  if (cart.length === 0) {
    return (
      <div className='flex flex-col gap-6 justify-center items-center page-h'>
        <h2 className='font-medium leading-tight text-3xl mt-0 mb-2'>
          No Items in your cart
        </h2>
        <Link href='/products'>
          <button className='btn-primary'>Product</button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Steps />
      <div
        className='flex flex-col lg:flex-row justify-between w-full m-auto
       bg-green-300/10 p-4 lg:px-[65px] gap-8'
      >
        <CartProducts />
        <CartTotals />
      </div>
    </div>
  );
};

export default CartPage;
