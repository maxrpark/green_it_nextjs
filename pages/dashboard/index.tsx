import { GetServerSideProps } from "next";
import axios from "axios";
import { OrderInterface } from "../../ts/";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { SectionHeader, SingleDetailRow } from "../../components/";
import { baseURL } from "../../axios";

interface Props {
  orders: OrderInterface[];
}

const DashboardPage: React.FC<Props> = ({ orders }) => {
  return (
    <ProfileLayout>
      <div className='w-full shadow-lg'>
        <SectionHeader
          mainTitle='transaction id'
          detailsOne='amount'
          detailsTwo='date'
        />

        {orders.map((order) => {
          return (
            <SingleDetailRow
              key={order._id}
              mainTitle={order._id!}
              detailsOne={`$${order.total}`}
              detailsTwo={order.status}
              url={`/order-details/${order._id!}`}
            />
          );
        })}
      </div>
    </ProfileLayout>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let orders;
  try {
    const { data } = await axios(`${baseURL}/orders/`, {
      withCredentials: true,
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });
    orders = data.orders;
  } catch (error: any) {
    console.log(error.response.data);

    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }

  return {
    props: {
      orders,
    },
  };
};
