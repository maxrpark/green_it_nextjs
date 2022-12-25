import { Sidebar, UserHeader } from "../";
import { useGlobalContext } from "../../contexts";

interface Props {
  children: React.ReactElement;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  const { showSidebar } = useGlobalContext();
  return (
    <div className='flex h-fit lg:gap-[21px]'>
      <div className='block lg:hidden '>
        <div
          className={`${
            showSidebar
              ? "block bg-[#000000a4] fixed z-50 w-full h-full m-auto inset-0 p-4"
              : "hidden"
          }`}
        >
          <Sidebar />
        </div>
      </div>
      <div className='hidden lg:block relative'>
        <Sidebar />
      </div>
      <div className='w-full flex flex-col gap-4 mb-20'>
        <UserHeader />
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
