import Link from "next/link";
import { useAuthContext } from "../../contexts";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/useGlobalContext";
import { SearchInput, NavbarLinksLargeScreen, IconsBars } from "../";

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const { toggleMobileNav } = useGlobalContext();

  const router = useRouter();
  const formSubmitFunc = (value: string) => {
    router.push(`/products?query=${value}`);
  };

  return (
    <nav className=''>
      <div className='flex container justify-between items-center mx-auto gap-7 py-2 px-5 lg:px-12'>
        <Link href='/'>
          <button className=' text-green-600 text-xl lg:text-4xl font-bold'>
            GreenIt
          </button>
        </Link>
        {router.pathname !== "/products" && (
          <SearchInput formSubmitFunc={formSubmitFunc} />
        )}
        <NavbarLinksLargeScreen />
        <div className='lg:hidden' onClick={toggleMobileNav}>
          <IconsBars />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
