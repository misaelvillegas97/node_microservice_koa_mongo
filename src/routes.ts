import Router from 'koa-router';
import { SwaggerRouter } from 'koa-swagger-decorator';
import generalController from './controllers/general.ctrl';

const unprotectedRouter = new Router();

unprotectedRouter.get('/status', generalController.status);

const protectedRouter = new SwaggerRouter();

// Swagger endpoint
protectedRouter.swagger({
    title: 'CLM_position_test',
    description: 'API REST using NodeJS and KOA framework, typescript, class-validators. Middlewares JWT, CORS, MongoDB database, Winston Logger.',
    version: '1.0.0'
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { unprotectedRouter, protectedRouter };