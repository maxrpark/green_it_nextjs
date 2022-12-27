import type { NextPage, GetServerSideProps } from "next";

import axios from "axios";
import { ProfileLayout } from "../../../components/layout";
import { OrderInterface, UserInterface } from "../../../ts/";
import { SingleDetailRow, CustomBtn } from "../../../components";
import { baseURL } from "../../../axios";
import SectionHeader from "../../../components/dashboard/SectionHeader";

interface Props {
  user: UserInterface;
  orders: OrderInterface[];
}

const UserProfile: NextPage<Props> = ({ user, orders }) => {
  console.log(user);

  return (
    <ProfileLayout>
      <div className='lg:p-8 '>
        <CustomBtn path={"/dashboard/users"} />
        <h2 className='mt-9 mb-3 px-2 text-[24px] font-semibold capitalize'>
          User details
        </h2>
        <SectionHeader mainTitle='email' detailsOne='name' detailsTwo='role' />
        <SingleDetailRow
          mainTitle={user.email}
          detailsOne={user.name}
          detailsTwo={user.role}
          url={`/dashboard/users/${user._id}`}
          isUserRow
        />
        {orders.length > 0 && (
          <>
            <h2 className='mt-9 mb-3 px-2 text-[24px] font-semibold capitalize'>
              User orders
            </h2>
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
          </>
        )}
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
    const { data } = await axios(`${baseURL}/users/${id}`, {
      withCredentials: true,
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });
    const { data: ordersData } = await axios(
      `${baseURL}/orders/user-orders/${id}`,
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
