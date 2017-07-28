const moment = require('moment');
const proxy = require('../proxy-travelfusion');
const config = require('../config.json');
const helper = require('../travelfusion-request-helper');

const search = async function (checkin, checkout, city) {

    let duration = helper.getMomentDate(checkout).diff(helper.getMomentDate(checkin), 'days');

    let res = await proxy.searchHotelPromise(config.travelfusion.hotels.apiEndpoint, helper.generateSearchOption(checkin, checkout, city));

    let jsonObj = JSON.parse(res.body);

    let result = {
        body: jsonObj,
        cookies: res.cookies
    }

    return result;
}

module.exports = {
    search: search
}