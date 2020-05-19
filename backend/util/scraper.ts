import * as cheerio from 'cheerio';

const vo = require('vo');
const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });

const url = 'https://shop.lululemon.com/c/men/_/N-1z13zi2Z7qr?mnid=mn;en-CA-JSON;men;we-made-too-much';

/**
 *  <div class='product-list-item'>
 *      <a class='link product-tile__image-link'> HREF LINK
 *          <span class='lazy-image-container'> LAST TAG
 *              <img data-ofi-src=''> IMAGE URL
 *      <div class='product-display-name'>
 *          <h3 class='product-name'>
 *      <span class='price-1SDQy price'> SALE PRICE
 *          <span class='priceInactiveListPrice-182Wu price__inactive-list-price'> ORIGINAL PRICE
 */

/**
 * Description: This is a generator function to be able to call Nightmare
 *              in chunks so we can execute the lazyloading page scrolling
 *              feature. If there is a way to do this without creating a
 *              generator function I'd love to know :)
 */
const run = function* () {
    yield nightmare.goto(url)
        .wait('body');
    
    // continuously scroll until we've reached the bottom
    // lululemon lazyloads their products so the entire DOM isn't
    // there on page load
    let previousHeight, currentHeight = 0;    
    while (previousHeight !== currentHeight) {
        // TODO: check for pagination button and click until all products loaded
        previousHeight = currentHeight;
        currentHeight = yield nightmare.evaluate(() => {
            return document.body.scrollHeight;
        })
        yield nightmare.scrollTo(currentHeight, 0)
            .wait(3000);
    }
    yield nightmare.evaluate(() => document.querySelector('body').innerHTML)
        .then((html: any) => {
            parseHtml(html);
        });
}

const parseHtml = (html: any) => {
    const $ = cheerio.load(html);
    $('h3.product-name').each((index: number, element: CheerioElement) => {
        console.log($(element).html());
    });
}

const runScraper = () => {
    // vo(run)((err: Error) => {
    //     console.log(err);
    // })
}

module.exports = { runScraper };