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
    <section className='overflow-hidden'>
      {/* <div className='h-[200px] w-[110%] bg-green-100 absolute rotate-12 top-0 left-0 opacity-30 origin-top-left -z-50 '></div>
      <div className='h-[200px] w-[110%] bg-green-100 absolute rotate-12 top-[60%] left-0 opacity-30 origin-top-left -z-50 '></div> */}
      {showTopMessage && <TopMessage />}

      <Navbar />
      {showMobileNavBar && <MobileNavBar />}
      <main className='page-h  px-2  md:container md:mx-auto relative'>
        {children}
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;
