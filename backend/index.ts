import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';

require('dotenv').config()

const scraper = require('./util/scraper');
const db = require('./database/db');

const app       = new Koa();
const router    = new Router();
const PORT      = process.env.PORT || 3000;

// Database
db.connect();

// Scheduled Scraper
scraper.runScraper();

// Middleware
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

router.get('/*', async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.body = { message: "Welcome to We Made Too Much Watcher" };
    await next();
});

app.listen(PORT, () => console.log(`Server running on port ${3000}`));