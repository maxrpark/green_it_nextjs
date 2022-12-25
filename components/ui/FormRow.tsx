interface Props {
  name: string;
  type: string;
  value: string | number;
  formName: string;
  labelText?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: React.FC<Props> = ({
  name,
  type,
  value,
  labelText,
  formName,
  handleChange,
}) => {
  return (
    <div className='flex flex-col gap-2 '>
      <label className='px-[10px] text-light-gray capitalize' htmlFor={name}>
        {labelText ? labelText : name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={formName}
        className='h-[39px] rounded-[5px] border border-light-gray p-[10px]'
        placeholder={labelText ? labelText : name}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormRow;
