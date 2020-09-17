import {
  GENRES_LOADING,
  GENRES_LOAD_FAIL,
  GENRES_LOAD_SUCCESS
} from "../types/genres";
import { ReducerState, ReducerPagination, ReducerStateEntity } from "../models/ReducerState";
import { ReducerAction } from "../models/ReducerAction";
import { Genre } from "../models/Genre";

const initialState: ReducerState = new ReducerState(
  new ReducerStateEntity({}, [], []),
  new ReducerPagination(1, 0, 20),
  false,
  false
);

function setGenresLoading(state: ReducerState, actions: { type: string, payload: boolean }): any {
  return Object.assign({}, state, {
    loading: actions.payload,
  });
}

function addGenres(state: ReducerState, actions: ReducerAction<Genre[]>): any {
  const { entity, pagination } = actions.payload;
  const { byId, ids } = { ...state.entities };
  
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
    },
    pagination: pagination,
  });
}

export default function moviesReducer(state = initialState, actions: ReducerAction<Genre[]>) {
  switch (actions.type) {
    case GENRES_LOADING:
      return setGenresLoading(state, { type: actions.type, payload: true })
    
      case GENRES_LOAD_SUCCESS:
        return addGenres(state, actions);

    case GENRES_LOAD_FAIL:
      return setGenresLoading(state, { type: actions.type, payload: false });
  
    default:
      return initialState;
  }
}
