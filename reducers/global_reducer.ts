import {
  GlobalInitialState,
  GlobalActions,
  ActionsTypes,
} from "../ts/interfaces/states";

const global_reducer = (
  state: GlobalInitialState,
  action: GlobalActions
): GlobalInitialState => {
  switch (action.type) {
    case ActionsTypes.TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case ActionsTypes.TOGGLE_MOBILE_NAV:
      return { ...state, showMobileNavBar: !state.showMobileNavBar };
    case ActionsTypes.HIDE_TOP_MESSAGE:
      return { ...state, showTopMessage: false };

    default:
      return state;
  }
};

export default global_reducer;
