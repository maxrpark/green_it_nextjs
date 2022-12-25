import axios from "axios";
import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserInterface } from "../../ts/";
import { UpdateUserDetailsForm } from "../../components";
import { ProfileLayout } from "../../components/layout";

interface Props {
  userInfo: UserInterface;
}

const UpdateUser: NextPage<Props> = ({ userInfo }) => {
  return (
    <ProfileLayout>
      <div>
        <UpdateUserDetailsForm user={userInfo} title='my info' />
        <UpdateUserDetailsForm
          user={userInfo}
          title='update password'
          isEditingPassword
        />
      </div>
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let user;

  const cookies = req.cookies;
  const decoded: { user: { userId: string } } = jwt_decode(
    cookies.refreshToken!
  );

  try {
    const { data } = await axios(
      `http://localhost:3000/api/users/${decoded.user.userId}`,
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
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
      userInfo: user,
    },
  };
};

export default UpdateUser;
