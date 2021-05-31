import { Length, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class Movie {
  id?: String;

  @Length(1, 80)
  @IsNotEmpty()
  title: String;

  @Length(1, 50)
  @IsNotEmpty()
  year: String;

  @Length(1, 80)
  @IsNotEmpty()
  released: String;

  @Length(1, 80)
  @IsNotEmpty()
  genre: String;

  @Length(1, 80)
  @IsNotEmpty()
  director: String;

  @Length(1, 250)
  @IsNotEmpty()
  actors: String;

  @Length(1, 250)
  @IsNotEmpty()
  plot: String;

  @Length(1, 80)
  @IsNotEmpty()
  ratings: String;
}

export default interface MovieList {
  success: Boolean;
  currentPage?: Number;
  pages?: Number;
  movies: Movie[];
  count: Number;
}
