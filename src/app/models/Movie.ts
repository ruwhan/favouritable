import { Genre } from "./Genre";

export class ProductionCompany {
  id!: number;
  name!: string;
  logo_path!: string;
  origin_country!: string;
}

export class SpokenLanguage {
  iso_639_1!: string;
  name!: string;
}

export class Movie {
  id!: number;
  backdrop_path!: string | null;
  poster_path!: string | null;
  title!: string;
  overview!: string; // description
  popularity!: string;
  release_date!: string; // date
  imdb_id!: string | null;
  runtime!: number | null;
  revenue!: number;
  vote_average!: number;
  vote_count!: number;
  genre_ids!: number[];
  
  production_company!: ProductionCompany[];
  genres!: Genre[];
}
