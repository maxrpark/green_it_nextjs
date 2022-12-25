import {
  useReducer,
  FC,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { ActionsTypes, GlobalInitialState } from "../ts/interfaces/states";
import global_reducer from "../reducers/global_reducer";
interface Props {
  children: ReactNode;
}

interface GlobalContextInterface extends GlobalInitialState {
  toggleSidebar: () => void;
  toggleMobileNav: () => void;
}

const initialState: GlobalInitialState = {
  showSidebar: false,
  showMobileNavBar: false,
};

const GlobalContext = createContext({} as GlobalContextInterface);

export const GlobalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    global_reducer,
    initialState as GlobalInitialState
  );

  const toggleSidebar = () => {
    dispatch({ type: ActionsTypes.TOGGLE_SIDEBAR });
  };
  const toggleMobileNav = () => {
    dispatch({ type: ActionsTypes.TOGGLE_MOBILE_NAV });
  };

  useEffect(() => {
    if (state.showMobileNavBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [state.showMobileNavBar]);
  return (
    <GlobalContext.Provider
      value={{ ...state, toggleSidebar, toggleMobileNav }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
