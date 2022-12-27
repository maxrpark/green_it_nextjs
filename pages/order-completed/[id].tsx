import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { OrderDetails } from "../../ts/interfaces/globalInterfaces";
import { CheckoutItems, OrderTotalsDetail } from "../../components";
import { baseURL } from "../../axios";
import Image from "next/image";

interface Props {
  orderSummary: OrderDetails;
}

const OrderCompletedPage: NextPage<Props> = ({ orderSummary }) => {
  return (
    <div className='lg:grid grid-cols-2 gap-4 mt-7'>
      <section className='h-full relative'>
        <Image src='/img/hero/hero_bg.jpg' layout='fill' alt='flowers' />
      </section>
      <div className='flex flex-col gap-6'>
        <section className='flex flex-col gap-2'>
          <h3 className=' font-bold tracking-normal '>ORDER DETAILS</h3>
          <h2 className='font-bold text-[42px] leading-[normal]'>
            THANK YOU FOR YOUR ORDERING
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </section>
        <CheckoutItems orderItems={orderSummary.orderItems} />
        <OrderTotalsDetail
          total={orderSummary.total}
          subtotal={orderSummary.subtotal}
        />
      </div>
    </div>
  );
};

export default OrderCompletedPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  let orderSummary;
  try {
    const { data } = await axios(`${baseURL}/orders/single-order/${query.id}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    orderSummary = data;
  } catch (error: any) {
    console.log(error.response.data);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: { orderSummary },
  };
};
