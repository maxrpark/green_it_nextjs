interface Props {
  mainTitle: string;
  detailsOne: string;
  detailsTwo?: string;
}
const SectionHeader: React.FC<Props> = ({
  mainTitle,
  detailsOne,
  detailsTwo,
}) => {
  return (
    <div
      className='flex justify-between
    bg-green-300 w-full py-4 rounded-tl-[20px] rounded-tr-[20px] capitalize font-bold '
    >
      <p className='pl-2 md:pl-16'>{mainTitle}</p>
      <div className={`flex gap-[24px]  ${!detailsTwo ? "pr-10" : "pr-4"}`}>
        <p>{detailsOne}</p>

        {detailsTwo && <p className='hidden md:block'>{detailsTwo}</p>}
      </div>
    </div>
  );
};

export default SectionHeader;
