import ActionsTypes from "../actionsTypes";

interface TOGGLE_SIDEBAR {
  type: ActionsTypes.TOGGLE_SIDEBAR;
}
interface TOGGLE_MOBILE_NAV {
  type: ActionsTypes.TOGGLE_MOBILE_NAV;
}

type GlobalActions = TOGGLE_SIDEBAR | TOGGLE_MOBILE_NAV;

export default GlobalActions;
