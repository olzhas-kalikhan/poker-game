import { LOAD_GAMELIST, ADD_GAME, REMOVE_GAME } from "actionTypes/actionTypes";

const initialState = {
  gameList: [],
};
const gamesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_GAMELIST:
      return {
        ...state,
        gameList: payload,
      };
    case ADD_GAME:
      return {
        ...state,
        gameList: {
          ...state.gameList,
          [payload.gameID]: payload.gameData,
        },
      };
    case REMOVE_GAME:
      return {
        ...state,
        gameList: state.gameList.filter(
          (game) => game.gameID !== payload.gameID
        ),
      };
    default:
      return state;
  }
};
export default gamesReducer;
