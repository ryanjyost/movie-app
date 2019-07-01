import update from "immutability-helper";
import Helpers from "./helpers";
const { createAction } = Helpers;

const getMovies = createAction("GET_MOVIES", {
  success: (movies, cutoffDate) => ({ movies, cutoffDate })
});

const getSeasons = createAction("GET_SEASONS", {
  success: seasons => ({ seasons })
});

const addMovie = createAction("ADD_MOVIE", {
  request: movie => ({ movie }),
  success: movies => ({ movies })
});

const editMovie = createAction("EDIT_MOVIE", {
  request: (movieId, updatedData) => ({ movieId, updatedData }),
  success: movies => ({ movies })
});

const switchSeason = createAction("SWITCH_SEASON", {
  request: seasonId => ({ seasonId })
});

export const actions = {
  getMovies,
  addMovie,
  editMovie,
  getSeasons,
  switchSeason
};

// reducer with initial state
const initialState = {
  movies: [],
  upcomingMovies: [],
  purgatoryMovies: [],
  pastMovies: [],
  seasons: [],
  recentSeason: null,
  selectedSeason: null,
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
      const upcoming = [],
        purgatory = [],
        past = [];

      for (let movie of payload.movies) {
        if (movie.rtScore > -1) {
          past.push(movie);
        } else if (movie.isClosed) {
          purgatory.push(movie);
        } else {
          upcoming.push(movie);
        }
      }

      return update(state, {
        movies: { $set: payload.movies },
        upcomingMovies: { $set: upcoming },
        purgatoryMovies: { $set: purgatory },
        pastMovies: { $set: past },
        moviePredictionCutoffDate: { $set: payload.cutoffDate }
      });
    case getSeasons.types.success:
      return update(state, {
        seasons: { $set: payload.seasons },
        recentSeason: { $set: payload.seasons[0] }
      });

    case addMovie.types.success:
    case editMovie.types.success:
      return update(state, {
        movies: { $set: payload.movies }
      });

    case switchSeason.types.request:
      if (!payload.seasonId) {
        return update(state, {
          selectedSeason: { $set: null }
        });
      }

      const newSeason = state.seasons.find(
        season => season.id === payload.seasonId
      );

      if (newSeason) {
        return update(state, {
          selectedSeason: { $set: newSeason }
        });
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default reducer;
