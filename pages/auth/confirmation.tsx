import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { baseURL } from "../../axios";
interface Props {
  isError: boolean;
  message: string;
}

const confirmation: NextPage<Props> = ({ isError, message }) => {
  return (
    <div className='text-center pt-32'>
      <h2 className='text-[26px] font-bold mb-6'>{message}</h2>
      {!isError && (
        <Link href='/auth'>
          <button className='btn-primary'>Please login</button>
        </Link>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let isError = false;
  let message = "";
  const { token, email } = ctx.query;
  try {
    const res = await axios.post(`${baseURL}/auth/confirmation/`, {
      verificationToken: token,
      email: email,
    });
    if (res.status == 200) {
      isError = false;
      message = res.data.msg;
    }
  } catch (error: any) {
    message = error.response.data.msg;
    isError = true;
  }

  return {
    props: {
      isError,
      message,
    },
  };
};
export default confirmation;
