import update from "immutability-helper";
import Helpers from "./helpers";
const { createAction } = Helpers;

const userLogin = createAction("USER_LOGIN", {
  request: userId => ({ userId }),
  success: user => ({ user })
});

export const actions = {
  userLogin
};

// reducer with initial state
const initialState = {
  user: null,
  status: {
    userLogin: false,
    error: null
  }
};

export function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case userLogin.types.request:
      return update(state, {
        status: {
          userLogin: { $set: true }
        }
      });
    case userLogin.types.success:
      return update(state, {
        user: { $set: payload.user },
        status: {
          userLogin: { $set: false }
        }
      });
    case userLogin.types.failure:
      return update(state, {
        user: {
          status: { error: { $set: true } }
        }
      });
    default:
      return state;
  }
}

export default reducer;
