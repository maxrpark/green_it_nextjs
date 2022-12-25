import { ProductInterface } from "../../../ts/";
import { FormRow, SelectRow, FormCheckBox, FormUploadFile } from "../..";
import { useAdminContext } from "../../../contexts/useAdminContext";

interface Props {
  product: ProductInterface;
  createNew?: boolean;
}

const SingleProductForm: React.FC<Props> = ({ product, createNew = false }) => {
  const {
    updateProduct,
    updateProductDetails,
    selectedProduct,
    isUploading,
    categories,
    types,
  } = useAdminContext();

  const handleFormClick = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct({ id: product._id!, createNew });
  };

  return (
    <form className='flex flex-col gap-4'>
      <FormRow
        name={"name"}
        type={"text"}
        value={selectedProduct.name}
        formName={""}
        handleChange={updateProductDetails}
      />
      <FormRow
        name={"price"}
        type={"number"}
        value={selectedProduct.price}
        formName={""}
        handleChange={updateProductDetails}
      />
      <FormRow
        name={"stock"}
        type={"number"}
        value={selectedProduct.stock}
        formName={""}
        handleChange={updateProductDetails}
      />
      <FormRow
        name={"short_desc"}
        type={"text"}
        value={selectedProduct.short_desc}
        formName={""}
        handleChange={updateProductDetails}
      />
      <FormRow
        name={"long_description"}
        type={"text"}
        value={selectedProduct.long_description}
        formName={""}
        handleChange={updateProductDetails}
      />
      <section className='flex justify-start items-center gap-6'>
        <SelectRow
          list={categories}
          name={"category"}
          type={"text"}
          value={selectedProduct.category}
          formName={""}
          handleChange={updateProductDetails}
        />
        <SelectRow
          list={types}
          name={"type"}
          type={"text"}
          value={selectedProduct.type}
          formName={""}
          handleChange={updateProductDetails}
        />
      </section>
      <section className='flex justify-start items-center gap-6'>
        <FormCheckBox
          name={"available"}
          type={"checkbox"}
          checked={selectedProduct.available}
          formName={""}
          handleChange={updateProductDetails}
        />
        <FormCheckBox
          name={"featured"}
          type={"checkbox"}
          checked={selectedProduct.featured}
          formName={""}
          handleChange={updateProductDetails}
        />
      </section>
      <FormUploadFile image={selectedProduct.image} />

      <button
        disabled={isUploading}
        onClick={handleFormClick}
        className='btn-primary w-fit m-auto capitalize'
      >
        {!createNew ? "update" : "create"}
      </button>
    </form>
  );
};

export default SingleProductForm;
