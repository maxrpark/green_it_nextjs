import ActionsTypes from "../actionsTypes";

interface TOGGLE_SIDEBAR {
  type: ActionsTypes.TOGGLE_SIDEBAR;
}
interface TOGGLE_MOBILE_NAV {
  type: ActionsTypes.TOGGLE_MOBILE_NAV;
}
interface HIDE_TOP_MESSAGE {
  type: ActionsTypes.HIDE_TOP_MESSAGE;
}

type GlobalActions = TOGGLE_SIDEBAR | TOGGLE_MOBILE_NAV | HIDE_TOP_MESSAGE;

export default GlobalActions;
