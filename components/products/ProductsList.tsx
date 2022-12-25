import { PaginationButtons } from "..";
import { ProductInterface } from "../../ts/";
import { useProductsContext } from "../../contexts";
import ProductCard from "./ProductCard";

const ProductsList: React.FC = () => {
  const { products, numberOfPages, productsPagination } = useProductsContext();

  return (
    <div>
      <div className='grid grid-cols-2 w-fit gap-5 m-auto lg:mx-0  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 justify-center items-center'>
        {products.map((product: ProductInterface) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
      {numberOfPages > 0 ? (
        <PaginationButtons paginationFunction={productsPagination} />
      ) : (
        <h2>No Products found</h2>
      )}
    </div>
  );
};

export default ProductsList;
