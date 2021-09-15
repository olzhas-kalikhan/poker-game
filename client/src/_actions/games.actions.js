import {
  ADD_GAME,
  LOAD_GAMELIST,
  LOAD_GAMELIST_FAIL,
  REMOVE_GAME,
} from "actionTypes/actionTypes";
import GamesService from "_services/games.services";
export const loadGameList = () => (dispatch) => {
  return GamesService.fetchGameList()
    .then((data) => {
      dispatch({
        type: LOAD_GAMELIST,
        payload: data,
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_GAMELIST_FAIL,
        payload: [],
      });
    });
};

export const addGame = (gameData) => (dispatch) => {
  dispatch({
    type: ADD_GAME,
    payload: gameData,
  });
};
export const removeGame = (gameID) => (dispatch) => {
  dispatch({
    type: REMOVE_GAME,
    payload: { gameID },
  });
};
