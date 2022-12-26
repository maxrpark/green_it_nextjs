import Image from "next/image";
import { useCartContext } from "../../contexts";
import TrashIcon from "../icons/Trash";
import AmountButtons from "../products/AmountButtons";
import styles from "./CartProduct.module.css";

interface Props {
  children: React.ReactNode;
  _id?: string;
  image: string;
  name: string;
  price: number;
  amount: number;
}

const ProductCardWithChildren: React.FC<Props> = ({
  _id,
  image,
  name,
  price,
  amount,
  children,
}) => {
  const { removeCartItem, toggleAmount } = useCartContext();
  return (
    <div key={_id} className=' md:h-[150px]  flex bg-white '>
      <div className='w-full max-w-[100px] sm:max-w-[236px] h-fill max-h-[200px] md:max-h-[150px] object-cover relative'>
        <Image layout='fill' src={image} objectFit='cover' />
      </div>

      <div className={styles["section-left"]}>
        <div className={styles["section-left__top"]}>
          <div className={styles["section-left__top-header"]}>
            <p className='bold text-base lg:text-[16px]'>{name}</p>
            <p className='hidden sm:block text-gray-300'>${price}</p>
          </div>
          <div className='flex  gap-4 items-center justify-center'>
            <AmountButtons
              increase={() => toggleAmount(_id!, "inc")}
              decrease={() => toggleAmount(_id!, "dec")}
              amount={amount}
            />
            <button onClick={() => removeCartItem(_id!)}>
              <TrashIcon />
            </button>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ProductCardWithChildren;
