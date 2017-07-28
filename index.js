const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());

app.listen(8300);

router.get('/', async function (ctx){
    ctx.body = "Hello from Hotel Search Consolidator";
})

router.post('/hotels/search', async function (ctx) {
    // ctx.body = "Search Result";


    const options2 = {
        body: `<GetHotelsRequest token="${config.travelfusion.hotels.token}" xmlns="http://www.travelfusion.com/xml/api/simple">` +
            '<location>' +
            //<!-- Submit only 1 of the following location identifiers -->
            // `<city code="LON"/>` +
            `<airport code="HKG"/>` +
            //`<hotel code="00005gaw87"/>` +
            //`<coordinate lat="0.34234" lon="65.283"/>` +
            // `<locationResolutionResultItem id="6296599"/>` +  // LCY
            '</location>' +
            // `<radius>3000</radius>` +        // in metres. If omitted, default logic will be used.
            `<date>2017-09-10</date>` +
            `<duration>2</duration>` +
            '<rooms>' +
                '<room>' +
                    //<!-- The ages of the people that will be staying in the room -->
                    '<ages>' +
                    `<age>30</age>` +
                    `<age>30</age>` +
                    // `<age>1</age>` +
                    '</ages>' +
                '</room>' +
            '</rooms>' +
            `<currency>HKD</currency>` +
            //<!-- special parameters may be necessary in certain special cases. Please discuss with Travelfusion if you feel that you need to submit any extra information such as personal logins to supplier systems -->
            // '<specialParameters>' +
            //     `<parameter type="supplier" name="_supplier_name_._param_name_">__some_value__</parameter>` +
            // '</specialParameters>' +
            '</GetHotelsRequest>',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            // 'Cookies': jsonObj.ResolveLocationResponse.sid,
            'Accept-Encoding': 'gzip',
            'Host': 'api.travelfusion.com',
            'User-Agent': 'curl/7.19.7 (x86_64-pc-linux-gnu) libcurl/7.19.7 zlib/1.2.3'
        }
    };

    return proxy.searchHotelPromise(config.travelfusion.hotels.apiEndpoint, options2);
})

.then(function (res) {
    console.log('------------------------------------------');
    console.log('1. Result from First GetHotelRequest');
    let jsonObj = JSON.parse(res.body);
    console.log(jsonObj);

})

