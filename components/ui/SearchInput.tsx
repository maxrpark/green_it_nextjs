import { useRef, useEffect } from "react";

interface Props {
  formSubmitFunc: (value: string) => void;
  value?: string;
}

const SearchInput: React.FC<Props> = ({ formSubmitFunc, value = "" }) => {
  const inputValue = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (!inputValue.current!.value) {
      formSubmitFunc("");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    formSubmitFunc(inputValue.current!.value);
    inputValue.current!.value = "";
  };
  useEffect(() => {
    inputValue.current!.value = value;
  }, [value]);

  return (
    <form className='w-full max-w-[600px] mx-auto' onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        placeholder='Search by name'
        className='w-full  light-gray border rounded-lg px-2 py-1'
        type='text'
        ref={inputValue}
      />
    </form>
  );
};

export default SearchInput;
