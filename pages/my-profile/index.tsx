import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import jwt_decode from "jwt-decode";
import { OrderInterface } from "../../ts/";
import { SingleDetailRow } from "../../components";
import { ProfileLayout } from "../../components/layout";

interface Props {
  orders: OrderInterface[];
}

const MyProfile: NextPage<Props> = ({ orders }) => {
  return (
    <ProfileLayout>
      <div className='lg:p-8 '>
        {orders.map((order) => {
          return (
            <SingleDetailRow
              key={order._id}
              mainTitle={order._id!}
              detailsOne={order.total}
              detailsTwo={order.status}
              url={`/order-details/${order._id!}`}
            />
          );
        })}
      </div>
    </ProfileLayout>
  );
};

export default MyProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = ctx.req.cookies;
  const decoded: { user: { userId: string } } = jwt_decode(
    cookies.refreshToken!
  );

  let userOrders;
  try {
    const { data } = await axios(
      `https://green-it-server.onrender.com/api/v1/orders/user-orders/${decoded.user.userId}`,
      {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      }
    );
    userOrders = data;
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
      orders: userOrders.orders,
    },
  };
};
