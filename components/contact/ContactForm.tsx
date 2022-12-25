import React from "react";
import { FormRow } from "..";
import { useState } from "react";
const contactForm = {
  name: "",
  email: "",
  title: "",
  subject: "",
};

const ContactForm: React.FC = () => {
  const [contactFormData, setContactFormData] = useState(contactForm);
  const [message, setMessage] = useState("");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    let value = e.target.value;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Your message have been send, we will get in touch soon.");
  };
  const sendNewMessage = () => {
    setContactFormData(contactForm);
    setMessage("");
  };
  return (
    <div className='flex justify-center items-center'>
      {!message.length ? (
        <form className='flex flex-col gap-6 w-full'>
          <FormRow
            name={"name"}
            type={"text"}
            value={contactFormData.name}
            formName={""}
            handleChange={handleInputChange}
          />
          <FormRow
            name={"email"}
            type={"text"}
            value={contactFormData.email}
            formName={""}
            handleChange={handleInputChange}
          />
          <FormRow
            name={"title"}
            type={"text"}
            value={contactFormData.title}
            formName={""}
            handleChange={handleInputChange}
          />
          <div>
            <label className='px-[10px] text-light-gray capitalize  '>
              Subject
            </label>
            <textarea
              className='w-full min-h-[120px] rounded-[5px] border border-light-gray mt-4 resize-none p-2'
              name='subject'
              value={contactFormData.subject}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button
            onClick={handleFormSubmit}
            className='btn-primary w-fit m-auto'
          >
            Submit
          </button>
        </form>
      ) : (
        <div className='flex flex-col gap-10'>
          <h2 className='text-center max-w-sm m-auto'>{message}</h2>
          <button onClick={sendNewMessage} className='btn-primary w-fit m-auto'>
            Send another message
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
