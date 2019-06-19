import update from "immutability-helper";
import Helpers from "./helpers";
const { createAction } = Helpers;

const getMovies = createAction("GET_MOVIES", {
  success: (movies, cutoffDate) => ({ movies, cutoffDate })
});

const addMovie = createAction("ADD_MOVIE", {
  request: movie => ({ movie }),
  success: movies => ({ movies })
});

const editMovie = createAction("EDIT_MOVIE", {
  request: (movieId, updatedData) => ({ movieId, updatedData }),
  success: movies => ({ movies })
});

export const actions = {
  getMovies,
  addMovie,
  editMovie
};

// reducer with initial state
const initialState = {
  movies: [],
  moviePredictionCutoffDate: null,
  status: {
    getMovies: false,
    error: null
  }
};

export function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case getMovies.types.success:
      return update(state, {
        movies: { $set: payload.movies },
        moviePredictionCutoffDate: { $set: payload.cutoffDate }
      });
    case addMovie.types.success:
    case editMovie.types.success:
      return update(state, {
        movies: { $set: payload.movies }
      });
    default:
      return state;
  }
}

export default reducer;
