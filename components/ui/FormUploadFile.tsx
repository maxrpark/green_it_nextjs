import axios from "axios";
import { useRef } from "react";
import { useAdminContext } from "../../contexts";

interface Props {
  image: string;
}

const FormUploadFile: React.FC<Props> = ({ image }) => {
  const { onUpLoadImg, isUploading } = useAdminContext();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className='flex flex-col justify-center items-center gap-2'>
      {image && (
        <img
          src={image}
          className='w-full max-w-[300px] m-auto object-contain'
          alt=''
        />
      )}
      <button
        type='button'
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className='btn-primary !bg-yellow-400 '
      >
        {!isUploading ? "Upload image" : "Uploading"}
      </button>
      <input
        ref={inputRef}
        className='hidden'
        onChange={onUpLoadImg}
        type='file'
        name=''
        id=''
      />
    </section>
  );
};

export default FormUploadFile;
