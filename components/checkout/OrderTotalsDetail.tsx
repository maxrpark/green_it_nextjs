import styles from "../cart/CartTotals.module.css";

interface Props {
  subtotal: number;
  total: number;
}

const OrderTotalsDetail: React.FC<Props> = ({ total, subtotal }) => {
  return (
    <section>
      <div className={styles["total-details"]}>
        <p>
          Subtotal <span className='text-black'>{subtotal}</span>
        </p>
        <p>
          Discount <span>TODO</span>
        </p>
        <p>
          Shipping <span>TODO</span>
        </p>
      </div>
      <p className={styles["order-total"]}>
        Total: <span>{total}</span>
      </p>
    </section>
  );
};

export default OrderTotalsDetail;
