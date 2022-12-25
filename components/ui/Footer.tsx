import LinksNavigationComponent from "./LinksNavigationComponent";

const Footer: React.FC = () => {
  return (
    <footer className=''>
      <LinksNavigationComponent />
      <div>
        <h2 className=' text-center bg-black text-white'>Created by Max</h2>
      </div>
    </footer>
  );
};

export default Footer;
