const ContactDetails: React.FC = () => {
  return (
    <div className='grid grid-flow-row justify-between items-end'>
      <img className='h-full mx-h-[350px]' src='/img/map.jpg' alt='' />
      <div>
        <p>Address: Lorem ipsum dolor sit.</p>
        <p>Tel: 123 312 321 123</p>
        <p>email: info@greenit.com</p>
        <p>Customer Service: 9am to 17pm</p>
      </div>
    </div>
  );
};

export default ContactDetails;
