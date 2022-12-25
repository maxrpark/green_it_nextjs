import { useEffect } from "react";
import { Footer, Navbar } from "../";
import { useAuthContext } from "../../contexts/useAuthContext";
import MobileNavBar from "../ui/MobileNavBar";
import { useGlobalContext } from "../../contexts/useGlobalContext";

interface Props {
  children: React.ReactElement;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const { showMe } = useAuthContext();
  const { showMobileNavBar } = useGlobalContext();
  useEffect(() => {
    showMe();
  }, []);
  return (
    <>
      <Navbar />
      {showMobileNavBar && <MobileNavBar />}
      <main className='page-h  px-2  md:container md:mx-auto relative'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
