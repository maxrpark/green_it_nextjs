import { useRouter } from "next/router";
import { useAuthContext, useGlobalContext } from "../../contexts/";
import styles from "../dashboard/Sidebar.module.css";
import { userLinks } from "../../utils/data/Links";

const UserLinks: React.FC = () => {
  const { user, logout } = useAuthContext();
  const { showSidebar, toggleSidebar } = useGlobalContext();
  const router = useRouter();

  const handleNavLinkClick = (urlLink: string) => {
    if (showSidebar) {
      toggleSidebar();
    }
    router.push(urlLink);
  };
  return (
    <div className='sticky top-4'>
      {userLinks.map((link) => {
        const ordersLink = user?.role == "user" ? "/my-profile" : "/dashboard";
        const urlLink = link.name == "orders" ? ordersLink : link.url;
        return (
          <button
            key={link.id}
            onClick={() => handleNavLinkClick(urlLink)}
            className={`${router.asPath === urlLink ? styles.active : ""} ${
              styles["sidebar-links"]
            } ${link.protected && user?.role === "user" ? "hidden" : ""} ${
              link.name === "cart" && user?.role !== "user" ? "hidden" : ""
            }`}
          >
            {link.name}
          </button>
        );
      })}
      <button
        className='btn-primary !bg-red-400 !text-white mt-4 mx-auto w-full'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserLinks;
