import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import axios from "axios";
import AuthForm from "../../components/auth/AuthForm";
import { useAuthContext } from "../../contexts";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { baseURL } from "../../axios";
import Image from "next/image";

const AuthPage: NextPage = () => {
  const { showResetPasswordForm } = useAuthContext();
  return (
    <div className='grid lg:grid-cols-2  lg:justify-center items-center min-h-[70vh]'>
      <div
        className="hidden lg:block  object-cover h-[90vh] '
        src='/img/hero/hero_bg.jpg relative"
      >
        <Image
          src='/img/hero/hero_bg.jpg'
          layout='fill'
          alt='flowers'
          objectFit='cover'
        />
      </div>
      {!showResetPasswordForm ? <AuthForm /> : <ForgotPasswordForm />}
    </div>
  );
};

export default AuthPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await axios(`${baseURL}/users/show-me`, {
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
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};
