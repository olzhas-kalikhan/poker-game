import { combineReducers } from "redux";
import auth from "./auth.reducer";
import games from "./games.reducer";
export default combineReducers({
  auth,
  games,
});
