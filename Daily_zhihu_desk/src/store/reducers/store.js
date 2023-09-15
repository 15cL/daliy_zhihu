import * as types from "../ACTION_TYPES";

let initVal = {
  list: [],
};

export default function storeReducer(state = initVal, actions) {
  state = JSON.parse(JSON.stringify(state));

  switch (actions.type) {
    case types.STAR_DEL:
      state.list.filter((v) => v.id !== actions.id);
      break;
    case types.STAR_LIST:
      state.list = actions.list;
      break;
    default:
      break;
  }
  return state;
}
