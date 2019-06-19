import update from "immutability-helper";
// action types
const UPDATE_DIMENSIONS = "UPDATE_DIMENSIONS";

const updateDimensions = windowWidth => {
  return { type: UPDATE_DIMENSIONS, windowWidth };
};

export const actions = {
  updateDimensions
};

// reducer with initial state
const initialState = {
  windowWidth: 0
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DIMENSIONS:
      return update(state, {
        windowWidth: { $set: action.windowWidth }
      });
    default:
      return state;
  }
}

export default reducer;
