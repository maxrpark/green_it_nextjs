import axios from "axios";
import { GetServerSideProps, NextPage } from "next/types";
import { baseURL } from "../axios";
import { Steps, CheckoutDetails, CheckoutForm } from "../components";
import { OrderDetails } from "../ts";

interface Props {
  orderDetails: OrderDetails;
}

const CheckoutPage: NextPage<Props> = ({ orderDetails }) => {
  return (
    <div>
      <Steps />
      <form className='flex flex-col lg:flex-row justify-between w-full m-auto bg-green-300/10 p-4 lg:px-[65px] gap-8'>
        <CheckoutForm />
        <CheckoutDetails orderDetails={orderDetails} />
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let orderDetails = null;
  try {
    const productsItems = JSON.parse(req.cookies.productItems!);
    const { data } = await axios.post(
      `${baseURL}/orders/stripe-session`,
      productsItems,
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    orderDetails = data;
  } catch (error: any) {
    console.log(error.response);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {
      orderDetails,
    },
  };
};

export default CheckoutPage;
