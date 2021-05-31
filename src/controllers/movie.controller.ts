import MovieList, { Movie } from './../models/movie.model';
import { BaseContext } from 'koa';
import { request, summary, tagsAll } from 'koa-swagger-decorator';
import { default as MovieService } from '../services/movie.service';
import {
  IUpdatePlotRequest,
  ISearchMoviesRequest,
  ISearchMoviesResponse,
} from '../interfaces/request.interface';

@tagsAll(['Movie'])
export default class MovieController {
  @request('get', '/movie')
  @summary('Find all movies')
  public static async getMovies(ctx: BaseContext) {
    const movies: MovieList = await MovieService.findAllMovies();
    if (movies) {
      ctx.status = 200;
      ctx.body = movies;
    } else throw new Error('Ha ocurrido un error');
  }

  @request('post', '/movie')
  @summary('Update plot of a movie')
  public static async updateMovie(ctx: BaseContext) {
    const body = ctx.request.body as IUpdatePlotRequest;
    if (!body.find || body.movie || body.replace) {
      throw new Error('Incorrect params');
    }

    const result = await MovieService.updateMovie(body);

    if (result) {
      ctx.status = 200;
      ctx.body = result;
    }
  }

  @request('get', '/movie/search')
  @summary('Look for movies from the api and feed local database')
  public static async searchMovie(ctx: BaseContext) {
    const query = ctx.query as ISearchMoviesRequest;
    if (!query.title) {
      throw new Error('Incorrect params');
    }
    const result = await MovieService.searchMovies(query);

    if (result) {
      ctx.status = 200;
      ctx.body = result;
      return;
    }
  }
}
