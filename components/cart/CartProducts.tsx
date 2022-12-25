import { useCartContext } from "../../contexts";
import ProductCardWithChildren from "../products/ProductCardWithChildren";

const CartProducts: React.FC = () => {
  const { cart } = useCartContext();

  return (
    <section className='flex flex-col gap-4 w-full'>
      {cart?.map((item) => {
        return (
          <ProductCardWithChildren {...item} key={item._id}>
            <div>
              <p className='text-[14px]'>Product Details</p>
              <div>
                <p className='text-[12px]'>name:{item.name}</p>
                <p className='text-[12px]'>amount:{item.amount}</p>
                <p className='text-[12px]'>price:{item.price}</p>
                <p className='text-[12px]'>
                  subtotal:{item.price * item.amount}
                </p>
              </div>
            </div>
          </ProductCardWithChildren>
        );
      })}
    </section>
  );
};

export default CartProducts;
