import { useCartContext } from "../../contexts";
import styles from "./CartTotals.module.css";
import { useAuthContext } from "../../contexts/useAuthContext";
import Link from "next/link";
import Spinner from "../ui/Spinner";

const CartTotals: React.FC = () => {
  const {
    total_amount,
    discount,
    shippingCost,
    createPaymentIntent,
    cart,
    isLoading,
  } = useCartContext();
  const { user } = useAuthContext();

  return (
    <div className={styles["total-container"]}>
      <h3 className='mb-2 text-light-gray'>Discount code</h3>
      {/* <div className={styles["discount-section"]}>
        <input
          placeholder='code'
          className='w-full max-w-[235px]  light-gray border'
        />
        <button className='flex items-center bg-light-gray h-full'>
          Apply
        </button>
      </div> */}
      <div className={styles["total-details"]}>
        <p>
          Subtotal <span>$ ${total_amount}</span>
        </p>
        <p>
          Discount <span>${discount}</span>
        </p>
        <p>
          Shipping <span>${shippingCost}</span>
        </p>
      </div>
      <p className={styles["order-total"]}>
        Total <span>$ ${total_amount - discount}</span>
      </p>
      {user?.name ? (
        <button
          onClick={() => createPaymentIntent(cart)}
          className='btn-primary w-full !rounded'
        >
          {isLoading ? <Spinner /> : "Pay now"}
        </button>
      ) : (
        <Link href={"/auth"}>
          <button className='btn-primary w-full !rounded'>Login</button>
        </Link>
      )}
    </div>
  );
};

export default CartTotals;
