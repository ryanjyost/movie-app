import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000
  });

  //============
  // Movies
  const getMovies = () => api.get("/movies");
  const getSeasons = () => api.get("/seasons");

  const addMovie = movie => api.post(`/movies/add`, { ...movie });

  const editMovie = (movieId, updateData) =>
    api.post(`/movies/edit/${movieId}`, { ...updateData });

  //============
  // users
  const loginUser = (access_token, platform) =>
    api.post(`/users/login/${platform}`, { access_token });

  const getUser = userId => api.get(`/users/${userId}`);

  const getUserOverall = userId => api.get(`/users/${userId}/overall`);

  const predictMovie = (movieId, userId, prediction) =>
    api.post(`/users/predict/${movieId}`, { userId, prediction });

  const getSeasonRankings = (groupId, seasonId) =>
    api.get(`/groups/${groupId}/rankings/${seasonId}`);

  const getOverallRankings = groupId => api.get(`/groups/${groupId}/rankings`);

  const createGroup = (accessToken, user) =>
    api.post("/groups/create", { accessToken, user });

  const createSlackChannel = code =>
    api.post("/slack/create_channel", { code });

  //============
  // admin
  const getAllFeedback = () => api.get("/admin/feedback");

  const respondToFeedback = (feedbackId, message) =>
    api.post(`/admin/feedback/${feedbackId}/respond`, {
      message
    });

  const messageAll = message =>
    api.post(`/admin/message/all`, {
      message
    });

  const sendMovieWarning = movieId =>
    api.post(`/admin/send_warning/${movieId}`);

  const getLogs = () => api.get("/admin/logs");

  return {
    getMovies,
    getSeasons,
    addMovie,
    editMovie,
    loginUser,
    getUser,
    createSlackChannel,
    getUserOverall,
    createGroup,
    predictMovie,
    getSeasonRankings,
    getOverallRankings,
    getAllFeedback,
    respondToFeedback,
    messageAll,
    getLogs,
    sendMovieWarning
  };
};

export default createApi;
