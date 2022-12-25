import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { CheckoutItems, OrderTotalsDetail } from "../../components";
import { OrderDetails } from "../../ts";

interface Props {
  orderSummary: OrderDetails;
}

const DashBoardOrder: NextPage<Props> = ({ orderSummary }) => {
  return (
    <ProfileLayout>
      <div className='w-full'>
        <CheckoutItems orderItems={orderSummary.orderItems} />
        <OrderTotalsDetail
          total={orderSummary.total}
          subtotal={orderSummary.subtotal}
        />
      </div>
    </ProfileLayout>
  );
};

export default DashBoardOrder;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  let orderSummary;
  try {
    const { data } = await axios(
      `http://localhost:3000/api/orders/single-order/${query.id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
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
