import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useAuthContext } from "../../contexts";
import { FormRow } from "../../components/";
import { useState, useEffect } from "react";
import { baseURL } from "../../axios";

const authFormData = {
  password: "",
  conformPassword: "",
};
interface Props {
  token: string;
  email: string;
}
const AuthPage: NextPage<Props> = ({ token, email }) => {
  const { errorMessage, resetPassword } = useAuthContext();
  const [authForm, setAuthForm] = useState(authFormData);
  const [areSamePassword, setAreSamePassword] = useState(true);
  const [canSubmitForm, setCanSubmitForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setAuthForm({ ...authForm, [name]: value });
  };

  const handleClick = () => {
    resetPassword({ password: authForm.password, token, email });
  };
  useEffect(() => {
    if (
      authForm.conformPassword == authForm.password &&
      authForm.conformPassword.length > 0
    ) {
      setCanSubmitForm(true);
    } else {
      setCanSubmitForm(false);
    }

    if (authForm.conformPassword.length > 0) {
      setAreSamePassword(false);
    }
    if (authForm.conformPassword == authForm.password) {
      setAreSamePassword(true);
    }
  }, [authForm.conformPassword, authForm.password]);

  return (
    <div className='grid lg:grid-cols-2  lg:justify-center items-center min-h-[70vh]'>
      <img
        className='hidden lg:block  object-cover h-[90vh] '
        src='/img/hero/hero_bg.jpg'
        alt=''
      />
      <form className='flex flex-col gap-4 max-w-xs m-auto w-full'>
        <h2 className='text-center text-[36px] font-bold capitalize'>
          Reset Password
        </h2>
        <FormRow
          name={"password"}
          type={"password"}
          value={authForm.password}
          formName={""}
          handleChange={handleInputChange}
        />
        <FormRow
          name={"conformPassword"}
          labelText={"Confirm Password"}
          type={"password"}
          value={authForm.conformPassword}
          formName={""}
          handleChange={handleInputChange}
        />
        {!areSamePassword && (
          <p className=' border-2 border-red-700 text-red-700 rounded-md p-1 text-center text-[14px]'>
            Passwords don&apos;t match.
          </p>
        )}
        {errorMessage && (
          <div className='border p-1 text-center border-red-700 rounded-sm text-red-700'>
            <p>{errorMessage}</p>
          </div>
        )}

        <button
          disabled={!canSubmitForm}
          onClick={handleClick}
          className='btn-primary '
        >
          confirm
        </button>
      </form>
    </div>
  );
};

export default AuthPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, email } = ctx.query;
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
  } catch (error) {}

  return {
    props: {
      token,
      email,
    },
  };
};
