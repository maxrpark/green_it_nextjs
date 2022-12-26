import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartContext } from "../../contexts/useCartContext";
import { SingleItemOrderInf } from "../../ts/";
import Image from "next/image";

const CartItemsNav: React.FC = () => {
  const [cartItems, setCartItems] = useState<SingleItemOrderInf[]>([]);
  const { cart, total_amount } = useCartContext();

  useEffect(() => {
    setCartItems(cart);
  }, []);

  return (
    <div
      className='py-2
    '
    >
      <div>
        {cartItems.map((item) => {
          return (
            <Link key={item._id} href={`/products/${item._id}`}>
              <div
                key={item._id}
                className='flex gap-2 py-4 border-b-2 border-light-gray cursor-pointer'
              >
                <div className='w-[70px] h-[70px] relative'>
                  <Image
                    layout='fill'
                    src={item.image}
                    alt={item.name}
                    objectFit='cover'
                  />
                </div>
                <div>
                  <p>{item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Amount: {item.amount}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className='flex flex-col py-4 gap-2'>
        <h2 className='font-bold text-center'>Total $ {total_amount}</h2>
        <Link href={"/cart"}>
          <button className='bg-black p-2 w-full text-white'>Go to cart</button>
        </Link>
      </div>
    </div>
  );
};

export default CartItemsNav;
