const moment = require('moment');
const config = require('./config.json');

const getMomentDate = function (date) {
    const year = date.substring(0, 4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);
    return moment([year, month, day]);
}

const generateSearchOption = function (checkin, checkout, duration, city, currency, adultCount, childCount) {

    let adults = '';
    let children = '';

    for (let i=0; i < adultCount; i++) {
        adults = adults +  '<age>30</age>';
    }

    for (let j=0; j < childCount ; j++) {
        children = children + '<age>3</age>';
    }

    const guestAges = `<ages>${adults}${children}</ages>`;

    console.log('guestAges', guestAges);

    const options = {
        body: `<GetHotelsRequest token="${config.travelfusion.hotels.token}" xmlns="http://www.travelfusion.com/xml/api/simple">` +
            '<location>' +
            `<airport code="${city}"/>` +
            //`<hotel code="00005gaw87"/>` +
            //`<coordinate lat="0.34234" lon="65.283"/>` +
            // `<locationResolutionResultItem id="6296599"/>` +  // LCY
            '</location>' +
            // `<radius>3000</radius>` +        // in metres. If omitted, default logic will be used.
            `<date>${checkin}</date>` +
            `<duration>${duration}</duration>` +
            '<rooms>' +
                `<room>${guestAges}</room>` +
            '</rooms>' +
            `<currency>${currency}</currency>` +
            //<!-- special parameters may be necessary in certain special cases. Please discuss with Travelfusion if you feel that you need to submit any extra information such as personal logins to supplier systems -->
            // '<specialParameters>' +
            //     `<parameter type="supplier" name="_supplier_name_._param_name_">__some_value__</parameter>` +
            // '</specialParameters>' +
            '</GetHotelsRequest>',
        headers:{
            'Content-Type': 'text/xml; charset=utf-8',
            'Accept-Encoding': 'gzip',
            'Host': 'api.travelfusion.com',
            'User-Agent': 'curl/7.19.7 (x86_64-pc-linux-gnu) libcurl/7.19.7 zlib/1.2.3'
        }
    }
    // console.log(options);
    return options;
}

// const generateResultRequestOption = function (routingId) {

//     const options = {
//         body: '<CommandList>' +
//             '<CheckRouting>' +
//                 `<XmlLoginId>${config.travelfusion.flights.xmlLoginId}</XmlLoginId>` +
//                 `<LoginId>${config.travelfusion.flights.xmlLoginId}</LoginId>` +
//                 `<RoutingId>${routingId}</RoutingId>` +
//             `</CheckRouting>` +
//         `</CommandList>`,
//         headers: {
//             'Content-Type': 'text/xml; charset=utf-8',
//         }
//     }
// console.log(options);
//     return options;
// }

module.exports = {
    getMomentDate: getMomentDate,
    generateSearchOption: generateSearchOption
    // generateResultRequestOption: generateResultRequestOption
}