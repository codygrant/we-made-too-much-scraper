import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as logger from 'koa-logger';


const app       = new Koa();
const router    = new Router();
const PORT      = 3000;

// Middleware
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

router.get('/*', async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.body = { message: "GET request" };
    await next();
});

app.listen(PORT, () => console.log(`Server running on port ${3000}`));