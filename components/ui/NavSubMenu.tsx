import React from "react";
import { useState } from "react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  name: string;
  url: string;
  icon?: boolean;
}

const NavSubMenu: React.FC<Props> = ({ children, name, url, icon = false }) => {
  const [showSection, setShowSection] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowSection(true)}
      onMouseLeave={() => setShowSection(false)}
      className='relative '
    >
      <Link href={`/${url}`}>
        <p
          className={`text-[17px] capitalize cursor-pointer ${
            icon &&
            "bg-green-300 text-green-900 font-bold h-10 w-10 flex justify-center items-center p-2 rounded-full"
          }`}
        >
          {name}
        </p>
      </Link>
      {showSection && (
        <div
          className={`absolute h-fit bg-white z-50 px-2 border shadow left-1/2 -translate-x-1/2 ${
            icon ? "w-[200px]" : "w-[250px]"
          } `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavSubMenu;
