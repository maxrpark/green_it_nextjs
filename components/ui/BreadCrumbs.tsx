import { HomeIcon, SeparatorIcon } from "..";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  name?: string;
}

const BreadCrumbs: React.FC<Props> = ({ name }) => {
  const router = useRouter();
  let pathName = router.pathname.split("/")[1];

  return (
    <div className='flex items-center bg-white gap-[10px] p-[10px] w-fit rounded-[20px] shadow-xl  mb-16 '>
      <Link href={`/`}>
        <a>
          <HomeIcon />
        </a>
      </Link>
      <SeparatorIcon />

      <Link href={`/${pathName}`}>
        <a>{pathName}</a>
      </Link>
      {name && (
        <>
          <SeparatorIcon />
          {name}
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
