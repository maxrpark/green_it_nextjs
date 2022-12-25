import React from "react";
import { useRouter } from "next/router";
import Links from "../../utils/data/Links";
import { useGlobalContext, useAuthContext } from "../../contexts";

interface Props {
  isMobile?: boolean;
}

const LinksNavigationComponent: React.FC<Props> = ({ isMobile = false }) => {
  const { user } = useAuthContext();
  const { toggleMobileNav } = useGlobalContext();
  const router = useRouter();

  const handleClick = (urlLink: string) => {
    router.push(urlLink);
    if (isMobile) toggleMobileNav();
  };
  return (
    <div
      className={`${
        !isMobile && "grid md:grid-cols-3 text-center bg-green-300"
      }`}
    >
      {Links.map((section) => {
        return (
          <div
            key={section.id}
            className={`max-w-[300px] m-auto bg-green-300 text-center flex flex-col gap-2 my-3 w-full ${
              !isMobile && " my-0 h-full max-w-none"
            } `}
          >
            <h3
              className={`${
                section.name === "green it" &&
                "text-[27px] bg-transparent font-bold border-none w-full "
              } capitalize text-[20px] text-green-900  border-b-4 border-white my-4`}
            >
              {section.name}
            </h3>
            <div className='flex flex-col gap-2'>
              {section.links.length > 0 &&
                section.links.map((link) => {
                  const tempLink =
                    user?.role == "user" ? "/my-profile" : "/dashboard";
                  const urlLink =
                    link.name == "Dashboard" ? tempLink : link.url;
                  return (
                    <button
                      key={link.id}
                      className={`${
                        router.asPath === urlLink
                          ? "bg-green-900 font-bold text-white  pl-2 rounded-md"
                          : ""
                      }`}
                      onClick={() => handleClick(urlLink)}
                    >
                      {link.name}
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LinksNavigationComponent;
