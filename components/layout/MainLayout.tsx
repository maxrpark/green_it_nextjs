import { useEffect } from "react";
import { useAuthContext } from "../../contexts/useAuthContext";

import { useGlobalContext } from "../../contexts/useGlobalContext";
import { Footer, Navbar, TopMessage, MobileNavBar } from "../";

interface Props {
  children: React.ReactElement;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const { showMe } = useAuthContext();
  const { showMobileNavBar, showTopMessage } = useGlobalContext();
  useEffect(() => {
    showMe();
  }, []);
  return (
    <>
      {showTopMessage && <TopMessage />}

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
