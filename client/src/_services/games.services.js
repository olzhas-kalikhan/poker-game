import axios from "axios";

const fetchGameList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/games")
      .then((response) => resolve(response.data))
      .catch((err) => reject(err.response));
  });
};
const fetchGame = (gameID) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/games/${gameID}`)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
};
export default { fetchGameList, fetchGame };
