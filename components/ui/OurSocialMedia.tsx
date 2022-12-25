import React from "react";
import SocialLinks from "../../utils/data/SocialLinks";

const OurSocialMedia: React.FC = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h2 className='text-center text-[42px] font-bold '>Follow us</h2>
        <p className='text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          eaque aperiam saepe eum ut cupiditate.
        </p>
      </div>
      <div className='flex gap-4 justify-center items-center'>
        {SocialLinks.map((link) => {
          return (
            <a
              className='bg-green-200 w-[38px] h-[38px] flex justify-center items-center rounded-full'
              href={link.url}
              target={"_blank"}
              key={link.id}
            >
              <link.name></link.name>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default OurSocialMedia;
