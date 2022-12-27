import { useAuthContext } from "../../contexts";
const AutoLoginButtons: React.FC = () => {
  const { logInTestAccounts } = useAuthContext();
  return (
    <>
      <button
        type='button'
        onClick={() => logInTestAccounts("user@email.com")}
        className='cursor-pointer btn-primary !bg-yellow-400 hover:!bg-yellow-500'
      >
        Login as user (Test)
      </button>
      <button
        onClick={() => logInTestAccounts("supervisor@greenit.com")}
        type='button'
        className='cursor-pointer btn-primary !bg-yellow-400 hover:!bg-yellow-500 '
      >
        Login as Supervisor (Test)
      </button>
    </>
  );
};

export default AutoLoginButtons;
