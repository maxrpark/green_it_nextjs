import React from "react";
import Link from "next/link";

import { ProductsNav, NavSubMenu, UserLinks, CartItemsNav } from "../";
import { useAuthContext } from "../../contexts/";

const NavbarLinksLargeScreen: React.FC = () => {
  const { user } = useAuthContext();

  const url =
    user?.role === "admin" || user?.role === "supervisor"
      ? "dashboard"
      : "my-profile";

  return (
    <div className='hidden lg:flex justify-end gap-12  items-center '>
      <NavSubMenu name={"products"} url='products'>
        <ProductsNav />
      </NavSubMenu>
      <NavSubMenu name={"cart"} url='cart'>
        <CartItemsNav />
      </NavSubMenu>
      {user?.name ? (
        <NavSubMenu name={user.name[0]} url={url} icon>
          <div className='py-5'>
            <UserLinks />
          </div>
        </NavSubMenu>
      ) : (
        <Link href={"/auth"}> Login</Link>
      )}
    </div>
  );
};

export default NavbarLinksLargeScreen;
