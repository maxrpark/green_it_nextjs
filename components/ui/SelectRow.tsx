interface Props {
  name: string;
  type: string;
  value: string | number;
  formName: string;
  labelText?: string;
  list: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormRow: React.FC<Props> = ({
  name,
  list,
  value,
  labelText,
  handleChange,
}) => {
  return (
    <div className='flex w-full'>
      <label htmlFor={name} className='px-[10px] text-light-gray capitalize'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='border-[1px] rounded-[20px] w-full p-1'
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRow;
