import { GetServerSideProps } from "next";
import { NextPage } from "next/types";

import { SectionHeader, SingleDetailRow } from "../../../components";
import { ProfileLayout } from "../../../components/layout";
import axios from "axios";
import { UserInterface } from "../../../ts/";

interface Props {
  users: UserInterface[];
}

const AdminUsersList: NextPage<Props> = ({ users }) => {
  return (
    <ProfileLayout>
      <div className='w-full shadow-lg'>
        <SectionHeader mainTitle='name' detailsOne='role' />
        {users.map((user) => {
          return (
            <SingleDetailRow
              key={user._id}
              mainTitle={user.name}
              detailsOne={user.role}
              url={`/dashboard/users/${user._id!}`}
              isUserRow
            />
          );
        })}
      </div>
    </ProfileLayout>
  );
};

export default AdminUsersList;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios("http://localhost:3000/api/users/all-users", {
    withCredentials: true,
    headers: {
      Cookie: ctx.req.headers.cookie,
    },
  });

  return {
    props: {
      users: data.users,
    },
  };
};
