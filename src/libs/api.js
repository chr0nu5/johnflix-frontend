const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:8000";

export default function Api() {
  const login = async function (username, password) {
    return fetch(API_URL + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((data) => {
      return data.json();
    });
  };

  const getProfile = async function (token) {
    return fetch(API_URL + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getContents = async function (token) {
    return fetch(API_URL + "/content", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getWatching = async function (token, hidden) {
    return fetch(API_URL + `/progress?hidden=${hidden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const saveProgress = async function (token, hash, end, time, volume, speed) {
    return fetch(
      API_URL +
        "/progress/" +
        hash +
        "?end=" +
        end +
        "&time=" +
        time +
        "&volume=" +
        volume +
        "&speed=" +
        speed,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then((data) => {
      return data.json();
    });
  };

  const getLatest = async function (token, path, hidden) {
    return fetch(API_URL + "/latest/" + path + `?hidden=${hidden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getRandom = async function (token, path, hidden) {
    return fetch(API_URL + "/random/" + path + `?hidden=${hidden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getContent = async function (token, hash) {
    return fetch(API_URL + "/content/" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getMedia = async function (token, hash) {
    return fetch(API_URL + "/media/" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getSeason = async function (token, hash) {
    return fetch(API_URL + "/season/" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getEpisode = async function (token, hash) {
    return fetch(API_URL + "/episode/" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getGenres = async function (token, hidden) {
    return fetch(API_URL + `/genre?hidden=${hidden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getGenre = async function (token, hash, page) {
    return fetch(API_URL + "/genre/" + hash + "?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getTags = async function (token, hidden) {
    return fetch(API_URL + `/tag?hidden=${hidden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getTag = async function (token, hash, page) {
    return fetch(API_URL + "/tag/" + hash + "?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getMovie = async function (token, hash) {
    return fetch(API_URL + "/movie/" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getAllMovies = async function (token, page, order, hidden) {
    return fetch(
      API_URL +
        "/movies/all?page=" +
        page +
        "&order=" +
        order +
        "&hidden=" +
        hidden,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then((data) => {
      return data.json();
    });
  };

  const getPhotos = async function (token) {
    return fetch(API_URL + "/photo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getPhoto = async function (token, hash, page) {
    return fetch(API_URL + "/photo/" + hash + "?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const search = async function (token, search) {
    return fetch(API_URL + "/search?s=" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const searchExtra = async function (token, search, genres, tags) {
    return fetch(API_URL + `/search?s=${search}&g=${genres}&t=${tags}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getWatchlist = async function (token, page) {
    return fetch(API_URL + "/watchlist?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getRecommended = async function (token, hash) {
    return fetch(API_URL + "/recommended?hash=" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const saveToWatchlist = async function (token, hash) {
    return fetch(API_URL + "/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        movie: hash,
        episode: hash,
      }),
    }).then((data) => {
      return data.json();
    });
  };

  const getWatchParty = async function (token, hash) {
    return fetch(API_URL + "/watchparty/" + hash, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const getWatchPartyFiltered = async function (token, hash, id) {
    return fetch(API_URL + "/watchparty/" + hash + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  const sendWatchPartyMessage = async function (token, hash, text) {
    return fetch(API_URL + "/watchparty/" + hash, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        text,
      }),
    }).then((data) => {
      return data.json();
    });
  };

  const getPlaylists = async function (token, hidden) {
    return fetch(API_URL + `/playlist?hidden=${hidden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((data) => {
      return data.json();
    });
  };

  return {
    login,
    getProfile,
    getContents,
    getWatching,
    getLatest,
    getRandom,
    getContent,
    getMedia,
    getSeason,
    getEpisode,
    getGenres,
    getTags,
    getTag,
    getMovie,
    getAllMovies,
    getGenre,
    saveProgress,
    search,
    searchExtra,
    getPhotos,
    getPhoto,
    getWatchlist,
    saveToWatchlist,
    getRecommended,
    getWatchParty,
    getWatchPartyFiltered,
    sendWatchPartyMessage,
    getPlaylists,
  };
}
