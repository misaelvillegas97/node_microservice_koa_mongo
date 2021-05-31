import { Movie } from './../models/movie.model';
export interface IUpdatePlotRequest {
  movie: String;
  find: String;
  replace: IReplaceSuccess | String;
}

export interface IReplaceSuccess {
  currentPlot: String;
  updatedPlot: String;
}

export interface ISearchMoviesRequest {
  title: String;
  year?: String;
}

export interface ISearchMoviesResponse {
  title: String;
  year?: String;
  movies: Movie[] | String;
}

export interface IOMDBMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}
