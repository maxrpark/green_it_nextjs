import CloseIcon from "../icons/CloseIcon";
import { useGlobalContext } from "../../contexts/";
import LinksNavigationComponent from "./LinksNavigationComponent";

const MobileNavBar: React.FC = () => {
  const { toggleMobileNav } = useGlobalContext();
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
      </div>
    </nav>
  );
};

export default MobileNavBar;
