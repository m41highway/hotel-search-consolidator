const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch');
const config = require('./config.json');
const travelfusion = require('./hotels/search-travelfusion')

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());

app.listen(8300);

router.get('/', async function (ctx){
    ctx.body = "Hello from Hotel Search Consolidator";
})

router.post('/hotels/search', async function (ctx) {

    const city = ctx.request.body.city; //'HKG';
    const checkin = ctx.request.body.checkin; //'2017-08-10';
    const checkout = ctx.request.body.checkout; //'2017-08-13';
    const currency = ctx.request.body.currency; // 'HKD'
    const adultCount = ctx.request.body.adultCount; // 4
    const childCount = ctx.request.body.childCount; // 1

    let res = await Promise.all([
        travelfusion.search(checkin, checkout, city, currency, adultCount, childCount)
    ]);

    console.log('------------------------------------------');
    console.log('1. Result from First GetHotelRequest');
    console.log(res);
    // let jsonObj = JSON.parse(res.body);
    // console.log(jsonObj);

    ctx.body = res;
})



