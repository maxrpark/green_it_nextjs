import React from "react";
import Image from "next/image";
import { ProductInterface } from "../../ts/";
import Link from "next/link";

interface Props {
  product: ProductInterface;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className='bg-white my-shadow  flex-shrink-0 max-w-[220px] h-[270px] cursor-pointer '>
        <figure className='flex'>
          <Image
            src={product.image}
            width={220}
            height={250}
            alt={product.name}
          />
        </figure>
        <div className='flex justify-between px-2 py-4'>
          <h2>{product.name}</h2>
          <h2>${product.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
