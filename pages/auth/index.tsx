import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import axios from "axios";
import AuthForm from "../../components/auth/AuthForm";
import { useAuthContext } from "../../contexts";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const AuthPage: NextPage = () => {
  const { showResetPasswordForm } = useAuthContext();
  return (
    <div className='grid lg:grid-cols-2  lg:justify-center items-center min-h-[70vh]'>
      <img
        className='hidden lg:block  object-cover h-[90vh] '
        src='/img/hero/hero_bg.jpg'
        alt=''
      />
      {!showResetPasswordForm ? <AuthForm /> : <ForgotPasswordForm />}
    </div>
  );
};

export default AuthPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await axios("http://localhost:3000/api/users/show-me", {
      withCredentials: true,
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });

    if (data.user?.role === "admin" || data.user?.role === "supervisor") {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard",
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/my-profile",
      },
    };
  } catch (error) {}

  return {
    props: {},
  };
};
