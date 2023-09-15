import * as types from "../ACTION_TYPES";

let initVal = {
  info: null,
};

export default function baseReducer(state = initVal, actions) {
  state = JSON.parse(JSON.stringify(state));
  switch (actions.type) {
    case types.USER_INFO:
      state.info = actions.info;
      
      break;

    default:
      break;
  }

  return state;
}
