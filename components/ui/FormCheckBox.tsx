import styles from "./FormCheckBox.module.css";

interface Props {
  name: string;
  type: string;
  checked: boolean;
  formName: string;
  labelText?: string;

  handleChange: any;
  // handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormCheckBox: React.FC<Props> = ({
  handleChange,
  name,
  checked,
  labelText,
}) => {
  return (
    <div className='form-row'>
      <p className='px-[10px] text-light-gray capitalize'>
        {labelText || name}
      </p>
      <div className={styles.switcher}>
        <input
          className={styles.input}
          type='checkbox'
          name={name}
          checked={checked}
          onChange={handleChange}
          id={name}
        />

        <label className={styles.label} htmlFor={name}>
          <small>false</small>
          <small>true</small>
          <div className={styles.ball}>
            <small>{checked ? "true" : "false"}</small>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FormCheckBox;
