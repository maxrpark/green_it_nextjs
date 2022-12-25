import styles from "./Sidebar.module.css";
import { useGlobalContext } from "../../contexts";
import { CloseIcon } from "../";
import UserLinks from "../ui/UserLinks";

const Sidebar: React.FC = () => {
  const { toggleSidebar } = useGlobalContext();

  return (
    <aside className={`${styles["aside-wrapper"]} `}>
      <button className='block lg:hidden' onClick={toggleSidebar}>
        <CloseIcon />
      </button>
      <UserLinks />
    </aside>
  );
};

export default Sidebar;
