import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000
  });

  //============
  // Movies
  const getMovies = () => api.get("/movies");

  const addMovie = movie => api.post(`/movies/add`, { ...movie });

  const editMovie = (movieId, updateData) =>
    api.post(`/movies/edit/${movieId}`, { ...updateData });

  //============
  // users
  const loginUser = access_token => api.post("/users/login", { access_token });

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

  const getLogs = () => api.get("/admin/logs");

  return {
    getMovies,
    addMovie,
    editMovie,
    loginUser,
    getAllFeedback,
    respondToFeedback,
    messageAll,
    getLogs
  };
};

export default createApi;
