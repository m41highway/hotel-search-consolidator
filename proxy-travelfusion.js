const Promise = require('bluebird');
const httpreq = require('httpreq');
const removeNewline = require('newline-remove');
const parser = require('xml2json');

const searchHotelPromise = function (url, options) {
    return new Promise(function(resolve, reject){
        httpreq.post('http://api.travelfusion.com/api-v2/', options, function (err, res){
            if (err) {
                return reject(err);
            }
            // console.log('====================================');
            // console.log(res);
            // console.log('====================================');

            if(res.statusCode != 200) console.log('Problem occurs!')

            let cleanBody = removeNewline(res.body);
            let json = parser.toJson(cleanBody);
            // console.log(json);
            result = {
                body: json,
                cookies: res.cookies
            }
            return resolve(result);
        });
    });
}

const delay = function (t) {
   return new Promise(function(resolve) {
       setTimeout(resolve, t)
   });
}

module.exports = {
    searchHotelPromise: searchHotelPromise,
    delay, delay
}