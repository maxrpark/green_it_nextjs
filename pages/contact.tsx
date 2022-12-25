import {
  BreadCrumbs,
  ContactForm,
  ContactDetails,
  OurSocialMedia,
} from "../components";
const ContactPage: React.FC = () => {
  return (
    <div className='container m-auto mb-20'>
      <BreadCrumbs />
      <h1 className='main-title text-center !mb-16 text-[56px] font-bold '>
        Contact
      </h1>
      <div className='grid lg:grid-cols-2 h-full gap-6 mb-14 md:mb-36'>
        <ContactDetails />
        <ContactForm />
      </div>
      <OurSocialMedia />
    </div>
  );
};

export default ContactPage;
