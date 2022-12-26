import CloseIcon from "../icons/CloseIcon";
import { useGlobalContext } from "../../contexts";
const TopMessage: React.FC = () => {
  const { hideTopMessage } = useGlobalContext();
  return (
    <section className='bg-red-300 p-4 flex justify-around items-center '>
      <p className='text-center lg:text-lg font-bold text-black'>
        Some features as login or register may not be available before the
        server finish loading. Please be patience.
      </p>
      <div onClick={hideTopMessage} className='absolute top-0 right-1'>
        <CloseIcon />
      </div>
    </section>
  );
};

export default TopMessage;
