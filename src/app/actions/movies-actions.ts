import {
  MOVIE_DETAILS_LOADING,
  MOVIE_DETAILS_LOAD_FAIL,
  MOVIE_DETAILS_LOAD_SUCCESS,
  MOVIES_LOADING,
  MOVIES_LOAD_FAIL,
  MOVIES_LOAD_SUCCESS,
} from "../types/movies";
import { Movie } from "../models/Movie";
import discoveriesService from "../services/DiscoveriesService";
import moviesService from "../services/MoviesService";
import { ReducerPagination } from "../models/ReducerState";
import { push } from "connected-react-router";

export const discoveriesLoading = () => ({
  type: MOVIES_LOADING
})

export const discoveriesLoadSuccess = (movies: Movie[], pagination: ReducerPagination) => ({
  type: MOVIES_LOAD_SUCCESS,
  payload: { entity: movies, pagination: pagination }
})

export const discoveriesLoadFail = () => ({
  type: MOVIES_LOAD_FAIL
})

export const movieDetailsLoading = () => ({
  type: MOVIE_DETAILS_LOADING
})

export const movieDetailsLoadSuccess = (movie: Movie) => ({
  type: MOVIE_DETAILS_LOAD_SUCCESS,
  payload: { entity: movie }
})

export const movieDetailsLoadFail = () => ({
  type: MOVIE_DETAILS_LOAD_FAIL
})

export const loadDiscoverMovies = (page: number = 1, sortBy: string = '', startReleaseDate = '', endReleaseDate = '') => {
  return (dispatch: Function, getState: Function) => {

    dispatch(discoveriesLoading());

    return discoveriesService.discoverMovie(page, sortBy, startReleaseDate, endReleaseDate)
        .then((res:Response) => {
          return res.json().then(
             (json) => {
                return dispatch(discoveriesLoadSuccess(json.results, new ReducerPagination(json.page, json.total_results)))
              }
          );
          
        })
        .catch((err) => discoveriesLoadFail());
  }
}

export const loadMovieDetails = (movieId: number) => {
  return (dispatch: Function, getState: Function) => {
    dispatch(movieDetailsLoading());
    return moviesService.getDetails(movieId)
        .then((res:Response) => {
          return res.json().then(
            (json) => {
              return dispatch(movieDetailsLoadSuccess(json))
            }
          );
          
        })
        .catch((err) => movieDetailsLoadFail());
  }
}

export const navigateToDiscoverMoviesPage = () => {
  return (dispatch: Function) => dispatch(push('/discovers'));
}

export const toggleFavourites = (movie: Movie) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const strFavourites:string =  localStorage.getItem('favourites') || '';
        const favourites: number[] = strFavourites 
            ? strFavourites.split(',').map((i) => Number.parseInt(i))
            : [];
        const movieId = movie.id;

        if (!favourites.includes(movieId)) {
          favourites.push(movieId);
          localStorage.setItem('favourites', favourites.toString());
          resolve(favourites);
        }
        else {
          const index = favourites.indexOf(movieId);
          favourites.splice(index, 1);
          localStorage.setItem('favourites', favourites.toString());
          resolve(favourites);
        }
      }, 1);
    });
  }
}

export const loadFavourites = () => {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const strFavourites: string = localStorage.getItem('favourites') || '';
        const favourites: number[] = strFavourites 
            ? strFavourites.split(',').map((i) => Number.parseInt(i))
            : [];
        resolve(favourites);
      }, 1);
    });
  }
}
