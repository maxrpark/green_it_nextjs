import CloseIcon from "../icons/CloseIcon";
import { useAuthContext, useGlobalContext } from "../../contexts/";
import LinksNavigationComponent from "./LinksNavigationComponent";
import Link from "next/link";

const MobileNavBar: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { toggleMobileNav } = useGlobalContext();

  const handleClick = () => {
    logout();
    toggleMobileNav();
  };
  return (
    <nav className='bg-[#000000a4] fixed z-50 w-full h-full m-auto inset-0 p-4 lg:hidden'>
      <div className='bg-green-300 h-full w-full  rounded-[20px] p-2 '>
        <button
          className='block absolute right-6 top-6 '
          onClick={toggleMobileNav}
        >
          <CloseIcon />
        </button>
        <LinksNavigationComponent isMobile />
        <section className=' max-w-[300px] mx-auto'>
          {!user?.name ? (
            <Link href={"/auth"}>
              <button
                onClick={toggleMobileNav}
                className='btn-primary !bg-green-900 !text-white mt-4 mx-auto w-full'
              >
                Login
              </button>
            </Link>
          ) : (
            <button
              className='btn-primary !bg-red-400 !text-white mt-4 mx-auto w-full'
              onClick={handleClick}
            >
              Logout
            </button>
          )}
        </section>
      </div>
    </nav>
  );
};

export default MobileNavBar;
