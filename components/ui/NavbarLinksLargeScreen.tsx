import React from "react";
import Link from "next/link";

import { ProductsNav, NavSubMenu, UserLinks, CartItemsNav } from "../";
import { useAuthContext } from "../../contexts/useAuthContext";

const NavbarLinksLargeScreen: React.FC = () => {
  const { user } = useAuthContext();

  const url =
    user?.role === "admin" || user?.role === "supervisor"
      ? "dashboard"
      : "my-profile";

  return (
    <div className='hidden lg:flex justify-end gap-12  items-center '>
      <NavSubMenu children={<ProductsNav />} name={"products"} url='products' />
      <NavSubMenu children={<CartItemsNav />} name={"cart"} url='cart' />
      {user?.name ? (
        <NavSubMenu
          children={
            <div className='py-5'>
              <UserLinks />
            </div>
          }
          name={user.name[0]}
          url={url}
          icon
        />
      ) : (
        <Link href={"/auth"}> Login</Link>
      )}
    </div>
  );
};

export default NavbarLinksLargeScreen;
