import React from "react";
import { QuotesIcon } from "..";
import { SectionTitleInt } from "../../ts";

interface Props {
  sectionTitle: SectionTitleInt;
  img: string;
  quote: string;
}

const ImageSection: React.FC<Props> = ({ sectionTitle, img, quote }) => {
  return (
    <section className='lg:grid grid-cols-2 '>
      <div className='image-container relative flex justify-center items-center p-2 bg-white lg:w-[358px] lg:h-[358px] m-auto '>
        <img className=' h-full ' src={img} alt='' />
      </div>
      <div className=' '>
        <div className='my-5 px-2'>
          <h3 className=' text-[26px] font-bold mb-4 '>{sectionTitle.title}</h3>
          <p>{sectionTitle.text}</p>
        </div>
        <QuotesIcon />
        <p className='font-bold text-[22px]'>{quote}</p>
        <QuotesIcon quoteRotate />
      </div>
    </section>
  );
};

export default ImageSection;
