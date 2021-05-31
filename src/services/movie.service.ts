import {
  ISearchMoviesRequest,
  ISearchMoviesResponse,
} from './../interfaces/request.interface';
import MovieRepository from '../schemas/movie.schema';
import MovieList, { Movie } from './../models/movie.model';
import { BaseService } from './base.srvc';
import { config } from './../config/config';
import {
  IUpdatePlotRequest,
  IOMDBMovie,
} from '../interfaces/request.interface';
import axios from 'axios';
import logger from '../util/logger';

/**
 * @class MovieService
 */
class MovieService extends BaseService<Movie> {
  Repository = MovieRepository;

  /**
   * @description Fetches all movies from the storage with optional pagination
   * @param {number} page Select page of the pagination
   * @returns {Promise<MovieList>} MovieList Promise
   */
  async findAllMovies(page?: number) {
    const PAGE_LIMIT: number = config.resultPerPage;
    const count: number = await this.Repository.countDocuments();
    if (count < 5) {
      const movies: Movie[] = await this.findAll();
      return {
        success: true,
        count,
        movies,
      } as MovieList;
    }

    const movies: Movie[] = await this.Repository.find()
      .skip(PAGE_LIMIT * page - PAGE_LIMIT)
      .limit(PAGE_LIMIT)
      .exec();

    return {
      success: true,
      count,
      movies,
      currentPage: page,
      pages: Math.ceil(count / PAGE_LIMIT) as number,
    } as MovieList;
  }

  async updateMovie(query: IUpdatePlotRequest) {
    const movie = await this.Repository.findOne({
      title: { $regex: query.movie, $options: 'i' },
    }).exec();
    if (!movie) throw new Error('Movie title not found');
    const originalPlot = movie.plot;
    movie.plot = movie.plot.replace(
      query.find.toString(),
      query.replace.toString()
    );

    const updatedmovie = await this.save(movie);

    return {
      movie: query.movie,
      find: query.find,
      replace: {
        currentPlot: originalPlot,
        updatedPlot: updatedmovie.plot,
      },
    } as IUpdatePlotRequest;
  }

  async searchMovies(query: ISearchMoviesRequest) {
    const omdb = (
      await axios.get(config.omdbApiURL, {
        params: {
          apikey: config.omdbApiKey,
          t: query.title,
          y: query.year ? query.year : '',
        },
      })
    ).data as IOMDBMovie;

    try {
      await this.save(this.convertOMDBToMovie(omdb));
    } catch (err) {
      logger.error(err.message);
    }

    const movies = await this.Repository.find({
      title: { $regex: query.title, $options: 'i' },
    }).exec();

    return {
      ...query,
      movies: movies ? movies : 'Movie not found',
    } as ISearchMoviesResponse;
  }

  async insertMoviesFromArray(movies: Movie[]) {
    return this.Repository.insertMany(movies);
  }

  async insertMovie(movie: Movie) {
    const movies = await this.Repository.find({
      title: movie.title,
    }).exec((err, movie) => {
      console.log(movie);
    });
  }

  convertOMDBToMovie(omdb: IOMDBMovie): Movie {
    return {
      actors: omdb.Actors,
      director: omdb.Director,
      genre: omdb.Genre,
      plot: omdb.Plot,
      ratings: omdb.imdbRating,
      released: omdb.Released,
      title: omdb.Title,
      year: omdb.Year,
    } as Movie;
  }
}

export default new MovieService();
