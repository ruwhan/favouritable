import {
  GENRES_LOADING,
  GENRES_LOAD_FAIL,
  GENRES_LOAD_SUCCESS
} from "../types/genres";
import genresService from "../services/GenresService";
import { Genre } from "../models/Genre";

export const genresLoading = () => ({
  type: GENRES_LOADING
})

export const genresLoadSuccess = (genres: Genre[]) => ({
  type: GENRES_LOAD_SUCCESS,
  payload: { entity: genres }
})

export const genresLoadFail = () => ({
  type: GENRES_LOAD_FAIL
})

export const loadGenres = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch(genresLoading());

    return genresService.get()
        .then((res:Response) => {
          return res.json().then(
             (json) => {
                return dispatch(genresLoadSuccess(json.genres))
              }
          );
          
        })
        .catch((err) => genresLoadFail());
  }
}
