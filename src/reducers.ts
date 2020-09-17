import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import moviesReducer from "./app/slice-reducers/movies-reducer";
import genresReducer from "./app/slice-reducers/genres-reducer";

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  movies: moviesReducer,
  genres: genresReducer,
});

export default createRootReducer;
