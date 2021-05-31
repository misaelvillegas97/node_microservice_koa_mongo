import { BaseContext } from 'koa';
import { description, request, summary, tagsAll } from 'koa-swagger-decorator';

@tagsAll(['General'])
export default class GeneralController {

    @request('get', '/status')
    @summary('Status Page')
    @description('Status page to verify if server it is up.')
    public static async status(ctx: BaseContext) {
        ctx.body = 'Up';
    }

}