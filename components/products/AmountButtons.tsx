interface Props {
  increase: () => void;
  decrease: () => void;
  amount: number;
}
const AmountButtons: React.FC<Props> = ({ increase, decrease, amount }) => {
  return (
    <div className='flex gap-[22px]  justify-center items-center w-fit m-auto  max-h-7'>
      <button onClick={decrease} className='text-[26px] text-gray-300 '>
        -
      </button>
      <p className=' text-[24px] m-0'>{amount}</p>
      <button onClick={increase} className='text-[26px] text-gray-300 '>
        +
      </button>
    </div>
  );
};

export default AmountButtons;
