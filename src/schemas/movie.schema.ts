import { Movie } from './../models/movie.model';
import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

type MovieDocument = mongoose.Document & Movie;

const movieSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: {
      type: String,
      required: true,
      validate: {
        isAsync: true,
        validator: function (value, isValid) {
          const self = this;
          return self.constructor
            .findOne({ title: value })
            .exec(function (err, movie) {
              if (err) {
                throw err;
              } else if (movie) {
                return isValid(false);
              } else {
                return isValid(true);
              }
            });
        },
        msg: 'The movie name is already taken!',
      },
    },
    year: String,
    released: String,
    genre: String,
    director: String,
    actors: String,
    plot: String,
    ratings: String,
  },
  { timestamps: true }
);

movieSchema.plugin(mongoosePaginate);
const MovieRepository = mongoose.model<MovieDocument>('Movie', movieSchema);
export default MovieRepository;
