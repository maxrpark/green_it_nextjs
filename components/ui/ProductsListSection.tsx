import { ProductListInt } from "../../ts/";
import { ProductsCarrousel } from "../";

interface Props {
  productsList: ProductListInt[];
}

const ProductsListSection: React.FC<Props> = ({ productsList }) => {
  return (
    <div className='space-y-9 mt-[50px] mb-[86px]'>
      {productsList.map((item) => {
        return (
          <section className='flex-col space-y-4' key={item.id}>
            <div className='flex items-center mb-2'>
              <h1 className='text-3xl font-bold min-w-[220px] text-center capitalize'>
                {item.name}
              </h1>
              <div className=' h-[5px] w-full bg-green-300'></div>
            </div>
            <ProductsCarrousel products={item.products} />
          </section>
        );
      })}
    </div>
  );
};

export default ProductsListSection;
