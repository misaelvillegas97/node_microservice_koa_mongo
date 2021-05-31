import Config from 'config';

export interface IConfig {
  port: number;
  loglevel: string;
  dbsslconn: boolean;
  jwtSecret: string;
  databaseUrl: string;
  cronJobExpression: string;
  resultPerPage: number;
  omdbApiKey: string;
  omdbApiURL: string;
}

const isDevMode = process.env.NODE_ENV == 'development';
const config: IConfig = {
  port: Config.get('ports.http') || 3000,
  loglevel: Config.get('loglevel'),
  dbsslconn: !isDevMode,
  jwtSecret: Config.get('auth.jwt_secret').toString() || 'your-secret-whatever',
  databaseUrl:
    Config.get('mongo.url').toString() ||
    'mongodb://clm_admin:clm_Gl2UsTdfmc@127.0.0.1:27017/clm',
  cronJobExpression: '0 * * * *',
  resultPerPage: Config.get('constant.PAGINATOR_LIMIT_PAGE'),
  omdbApiKey: Config.get('constant.MOVIEAPI_KEY'),
  omdbApiURL: Config.get('constant.MOVIEAPI_URL'),
};

export { config };
