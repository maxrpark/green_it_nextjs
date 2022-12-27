import { ProductInterface } from "../../ts/";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: ProductInterface;
}

const SingleProductTop: React.FC<Props> = ({ product }) => {
  return (
    <section className='flex-col flex gap-[32px] mb-8 mt-7 lg:mt-12'>
      <div className='relative w-full min-h-[300px] md:min-h-[500px] rounded-[10px] overflow-hidden'>
        <Image
          src={product.image}
          alt={product.name}
          layout='fill'
          objectFit='cover'
        ></Image>
      </div>
      <div className='flex flex-col gap-2 px-2'>
        <div className='flex gap-2 '>
          <Link href={`/products/category/${product.category}`}>
            <p className='bg-green-200 flex justify-center items-center w-fit px-2 py-[2px] rounded-full cursor-pointer hover:bg-green-400 transition-all '>
              {product.category}
            </p>
          </Link>
          <Link href={`/products/types/${product.type}`}>
            <p className='bg-green-200 flex justify-center items-center w-fit px-2 py-[2px] rounded-full cursor-pointer hover:bg-green-400 transition-all '>
              {product.type}
            </p>
          </Link>
        </div>

        <div className='flex gap-4 lg:gap-16 flex-wrap'>
          <h2 className='main-title text-center'>{product.name}</h2>
          <h2 className='main-title text-center'>${product.price}</h2>
        </div>
        <p>{product.short_desc}</p>
      </div>
    </section>
  );
};

export default SingleProductTop;
