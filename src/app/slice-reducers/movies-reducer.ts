import {
  MOVIE_DETAILS_LOADING,
  MOVIE_DETAILS_LOAD_FAIL,
  MOVIE_DETAILS_LOAD_SUCCESS,
  MOVIES_LOADING,
  MOVIES_LOAD_FAIL,
  MOVIES_LOAD_SUCCESS
} from "../types/movies";
import { ReducerState, ReducerPagination, ReducerStateEntity } from "../models/ReducerState";
import { ReducerAction } from "../models/ReducerAction";
import { Movie } from "../models/Movie";

const initialState: ReducerState = new ReducerState(
  new ReducerStateEntity({}, [], []),
  new ReducerPagination(1, 0, 20),
  false,
  false
);

function setMoviesLoading(state: ReducerState, actions: { type: string, payload: boolean }): any {
  return Object.assign({}, state, {
    loading: actions.payload,
  });
}

function addMovies(state: ReducerState, actions: ReducerAction<Movie[]>): any {
  const { entity, pagination } = actions.payload;
  const { byId, ids } = { ...state.entities };
  let activeIds = entity.map((ent) => ent.id);
  
  entity.forEach(element => {
    byId[element.id] = element;

    if (ids.indexOf(element.id) === -1) {
      ids.push(element.id);
    }
  });

  return Object.assign({}, state, {
    loading: false,
    entities: {
      byId,
      ids,
      activeIds,
    },
    pagination: pagination,
  });
}

function addMovie(state: ReducerState, actions: ReducerAction<Movie>) {
  const entity = actions.payload.entity;
  const { byId, ids } = { ...state.entities };
  const index = ids.indexOf(entity.id);

  byId[entity.id] = entity;
  if (index > -1) {
    ids.push(entity.id);
  }

  return Object.assign({}, state, {
    loading: false,
    entities: {
      byId,
      ids
    }
  });
}

export default function moviesReducer(state = initialState, actions: ReducerAction<Movie[] & Movie>) {
  switch (actions.type) {
    case MOVIES_LOADING:
      return setMoviesLoading(state, { type: actions.type, payload: true })
    
      case MOVIES_LOAD_SUCCESS:
        return addMovies(state, actions);

    case MOVIES_LOAD_FAIL:
      return setMoviesLoading(state, { type: actions.type, payload: false });
    case MOVIE_DETAILS_LOADING:
      return setMoviesLoading(state, { type: actions.type, payload: true })
    
      case MOVIE_DETAILS_LOAD_SUCCESS:
        return addMovie(state, actions);

    case MOVIE_DETAILS_LOAD_FAIL:
      return setMoviesLoading(state, { type: actions.type, payload: false });
  
    default:
      return initialState;
  }
}
