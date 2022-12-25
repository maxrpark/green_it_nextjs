import type { NextPage } from "next";
import { ProductInterface } from "../../../ts/";
import { ProfileLayout } from "../../../components/layout";
import { CustomBtn, SingleProductForm } from "../../../components";
import { useState } from "react";

// interface Props {
//   product: ProductInterface;
// }
const product: ProductInterface = {
  name: "",
  image: "",
  short_desc: "",
  long_description: "",
  price: 0,
  stock: 0,
  type: "",
  category: "",
  available: false,
  featured: false,
};

const CreateProductPage: NextPage = () => {
  const [singleProduct, setSingleProduct] = useState(product);
  return (
    <ProfileLayout>
      <div className=''>
        <CustomBtn path={"/dashboard/products"} />
        <SingleProductForm product={product} createNew />
      </div>
    </ProfileLayout>
  );
};

export default CreateProductPage;
