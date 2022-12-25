import Link from "next/link";
import { BillIcon } from "../";

interface Props {
  mainTitle: string;
  detailsOne: string | number;
  detailsTwo?: string | number;
  img?: string;
  url: string;
  isUserRow?: Boolean;
}

const SingleDetailRow: React.FC<Props> = ({
  mainTitle,
  detailsOne,
  detailsTwo,
  img,
  url,
  isUserRow,
}) => {
  return (
    <Link href={url}>
      <div className='flex justify-between items-center p-4 light-gray border-b cursor-pointer'>
        <div className='flex justify-center items-center gap-[9px]'>
          {!isUserRow ? (
            <>
              {!img ? (
                <BillIcon />
              ) : (
                <img src={img} className='w-[50px] h-[50px]' />
              )}
            </>
          ) : (
            <div className='capitalize h-[50px] w-[50px] flex justify-center items-center bg-green-300 rounded-full'>
              {mainTitle[0]}
            </div>
          )}

          <p className='pl-2 '>{mainTitle}</p>
        </div>
        <div className='flex gap-[24px] pr-4'>
          <p>{detailsOne}</p>
          {detailsTwo && <p className='hidden md:block'>{detailsTwo}</p>}
        </div>
      </div>
    </Link>
  );
};

export default SingleDetailRow;
