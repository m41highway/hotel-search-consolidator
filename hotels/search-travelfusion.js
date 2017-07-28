const proxy = require('../proxy-travelfusion');
const config = require('../config');

const search = async function (city) {

    let res = await proxy.searchHotelPromise(city);

    let jsonObj = JSON.parse(res);

    return jsonObj;
}

module.exports = {
    search: search
}