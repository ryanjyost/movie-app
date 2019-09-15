import update from "immutability-helper";
import Helpers from "./helpers";
import { persist } from "./persist";
const { createAction } = Helpers;

const userLogin = createAction("USER_LOGIN", {
  request: (accessToken, platform) => ({
    accessToken,
    platform
  }),
  success: user => ({ user }),
  failure: error => ({ error })
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
const deleteUser = createAction("DELETE_USER", {
  request: userId => ({ userId }),
  success: () => ({})
});
const getUserOverall = createAction("GET_USER_OVERALL", {
  request: userId => ({ userId }),
  success: overall => ({ overall })
});
const logout = createAction("LOGOUT", {
  request: () => ({})
});

const createSlackChannel = createAction("CREATE_SLACK_CHANNEL", {
  request: code => ({ code }),
  success: (user, group) => ({ user, group })
});

export const actions = {
  userLogin,
  predictMovie,
  getSeasonRankings,
  getOverallRankings,
  createGroup,
  switchGroup,
  getUser,
  deleteUser,
  getUserOverall,
  createSlackChannel,
  logout
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
    error: null
  }
};

export function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case createGroup.types.request:
    case createSlackChannel.types.request:
      return update(state, {
        status: {
          error: { $set: false }
        }
      });
    case createGroup.types.success:
      return update(state, {
        user: { $set: payload.user },
        group: { $set: payload.user.groups[0] },
        userId: { $set: payload.user._id }
      });
    case createSlackChannel.types.success:
      return update(state, {
        user: { $set: payload.user },
        group: { $set: payload.group },
        userId: { $set: payload.user._id }
      });
    case userLogin.types.request:
      return update(state, {
        status: {
          userLogin: { $set: true },
          fetchedUser: { $set: false },
          error: { $set: false }
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
        fetchedUser: { $set: false },
        error: { $set: false }
      });
    case getUser.types.success:
      return update(state, {
        user: { $set: payload.user },
        userId: { $set: payload.user._id },
        group: { $set: payload.user.groups[0] },
        fetchedUser: { $set: true }
      });
    case getUserOverall.types.request:
      return update(state, {
        error: { $set: false }
      });
    case getUserOverall.types.success:
      return update(state, {
        currentUserOverall: { $set: payload.overall }
      });
    case predictMovie.types.request:
      return update(state, {
        status: {
          predictMovie: { $set: true },
          error: { $set: false }
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

    case deleteUser.types.success:
      return update(state, {
        user: { $set: null }
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

    case logout.types.request:
      return update(state, {
        user: { $set: null },
        userId: { $set: null },
        accessToken: { $set: null }
      });
    case userLogin.types.failure:
      console.log("PAYLOAD", payload);
      return update(state, {
        status: {
          error: { $set: payload.error || true },
          fetchedUser: { $set: true }
        }
      });
    case getUser.types.failure:
      return update(state, {
        user: { $set: null },
        userId: { $set: null },
        status: {
          error: { $set: payload.error || true },
          fetchedUser: { $set: true }
        }
      });
    case createGroup.types.failure:
    case createSlackChannel.types.failure:
      break;

    default:
      return state;
  }
}

export default persist("user", ["userId", "flags"], reducer);
