import React from "react";

interface Props {
  title: string;
  text: string;
}

const SectionTitle: React.FC<Props> = ({ title, text }) => {
  return (
    <div className='my-5 px-2'>
      <h3 className=' text-[42px] font-bold mb-5'>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default SectionTitle;
