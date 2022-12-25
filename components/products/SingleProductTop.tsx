import { ProductInterface } from "../../ts/";
import Image from "next/image";

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
          <p className='bg-green-200 flex justify-center items-center w-fit px-2 py-[2px] rounded-full'>
            {product.category}
          </p>
          <p className='bg-green-200 flex justify-center items-center w-fit px-2 py-[2px] rounded-full'>
            {product.type}
          </p>
        </div>

        <div className='flex gap-16'>
          <h2 className='main-title'>{product.name}</h2>
          <h2 className='main-title'>${product.price}</h2>
        </div>
        <p>{product.short_desc}</p>
      </div>
    </section>
  );
};

export default SingleProductTop;
