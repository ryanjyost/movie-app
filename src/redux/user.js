import update from "immutability-helper";
import Helpers from "./helpers";
import { persist } from "./persist";
const { createAction } = Helpers;

const userLogin = createAction("USER_LOGIN", {
  request: (accessToken, createGroup) => ({ accessToken, createGroup }),
  success: user => ({ user })
});

const predictMovie = createAction("PREDICT_MOVIE", {
  request: (movieId, userId, prediction) => ({ movieId, userId, prediction }),
  success: user => ({ user })
});

const getSeasonRankings = createAction("GET_SEASON_RANKINGS", {
  request: (groupId, seasonId) => ({ groupId, seasonId }),
  success: rankings => ({ rankings })
});

const getOverallRankings = createAction("GET_OVERALL_RANKINGS", {
  request: groupId => ({ groupId }),
  success: rankings => ({ rankings })
});

const createGroup = createAction("CREATE_GROUP", {
  request: () => ({}),
  success: (group, user) => ({ group, user })
});

const switchGroup = createAction("SWITCH_GROUP", {
  request: groupId => ({ groupId })
});

const getUser = createAction("GET_USER", {
  request: userId => ({ userId }),
  success: user => ({ user })
});

const getUserOverall = createAction("GET_USER_OVERALL", {
  request: userId => ({ userId }),
  success: overall => ({ overall })
});

export const actions = {
  userLogin,
  predictMovie,
  getSeasonRankings,
  getOverallRankings,
  createGroup,
  switchGroup,
  getUser,
  getUserOverall
};

// reducer with initial state
const initialState = {
  user: null,
  userId: null,
  accessToken: null,
  group: null,
  currentSeasonRankings: [],
  overallRankings: [],
  currentUserOverall: null,
  status: {
    userLogin: false,
    fetchedUser: false,
    predictMovie: false,
    createGroup: false,
    startCreatingGroup: false,
    error: null
  }
};

export function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case createGroup.types.request:
      return update(state, {
        status: {
          startCreatingGroup: { $set: true }
        }
      });
    case createGroup.types.success:
      return update(state, {
        user: { $set: payload.user },
        userId: { $set: payload.user._id },
        status: {
          startCreatingGroup: { $set: false },
          createGroup: { $set: true }
        }
      });

    case userLogin.types.request:
      return update(state, {
        status: {
          userLogin: { $set: true },
          createGroup: { $set: false },
          fetchedUser: { $set: false }
        }
      });
    case userLogin.types.success:
      return update(state, {
        user: { $set: payload.user },
        userId: { $set: payload.user._id },
        group: { $set: payload.user.groups[0] },
        status: {
          userLogin: { $set: false },
          predictMovie: { $set: false },
          fetchedUser: { $set: true }
        }
      });

    case getUser.types.request:
      return update(state, {
        fetchedUser: { $set: false }
      });
    case getUser.types.success:
      return update(state, {
        user: { $set: payload.user },
        userId: { $set: payload.user._id },
        group: { $set: payload.user.groups[0] },
        fetchedUser: { $set: true }
      });

    case getUserOverall.types.request:
      return state;
    case getUserOverall.types.success:
      return update(state, {
        currentUserOverall: { $set: payload.overall }
      });

    case predictMovie.types.request:
      return update(state, {
        status: {
          predictMovie: { $set: true }
        }
      });
    case predictMovie.types.success:
      return update(state, {
        user: { $set: payload.user },
        userId: { $set: payload.user._id },
        group: { $set: payload.user.groups[0] },
        status: {
          userLogin: { $set: false },
          predictMovie: { $set: false }
        }
      });

    case getSeasonRankings.types.success:
      return update(state, {
        currentSeasonRankings: { $set: payload.rankings }
      });

    case getOverallRankings.types.success:
      return update(state, {
        overallRankings: { $set: payload.rankings }
      });

    case switchGroup.types.request:
      const newGroup = state.user.groups.find(
        group => group._id === payload.groupId
      );

      if (newGroup) {
        return update(state, {
          group: { $set: newGroup }
        });
      } else {
        return state;
      }

    case userLogin.types.failure:
    case getUser.types.failure:
      return update(state, {
        status: { error: { $set: true }, fetchedUser: { $set: true } }
      });
    default:
      return state;
  }
}

export default persist("user", ["userId", "status"], reducer);
