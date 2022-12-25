import { useAuthContext } from "../../contexts/useAuthContext";
import IconsBars from "../icons/IconsBars";
import { useGlobalContext } from "../../contexts/useGlobalContext";

const UserHeader: React.FC = () => {
  const { user } = useAuthContext();
  const { toggleSidebar } = useGlobalContext();
  return (
    <div className='flex items-center justify-between  shadow-lg p-3 rounded-lg'>
      <div className='flex items-center gap-2'>
        {user?.name && (
          <>
            <div className='capitalize h-[100px] w-[100px] flex justify-center items-center bg-green-300 rounded-full'>
              {user.name[0]}
            </div>
            <h2>{user.name}</h2>
          </>
        )}
      </div>

      <button className='block lg:hidden' onClick={toggleSidebar}>
        <IconsBars />
      </button>
    </div>
  );
};

export default UserHeader;
