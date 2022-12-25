import type { NextPage, GetServerSideProps } from "next";

import axios from "axios";
import { ProfileLayout } from "../../../components/layout";
import { OrderInterface, UserInterface } from "../../../ts/";
import { SingleDetailRow, CustomBtn } from "../../../components";

interface Props {
  user: UserInterface;
  orders: OrderInterface[];
}

const UserProfile: NextPage<Props> = ({ user, orders }) => {
  return (
    <ProfileLayout>
      <div className='lg:p-8 '>
        {user.name}
        <CustomBtn path={"/dashboard/users"} />
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

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;

  let user;
  let orders; //TODO
  try {
    const { data } = await axios(
      `https://green-it-server.onrender.com/api/v1/users/${id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      }
    );
    const { data: ordersData } = await axios(
      `https://green-it-server.onrender.com/api/v1/orders/user-orders/${id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      }
    );
    orders = ordersData.orders;
    user = data;
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
    props: {
      user,
      orders,
    },
  };
};
