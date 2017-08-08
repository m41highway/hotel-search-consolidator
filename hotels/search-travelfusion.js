const moment = require('moment');
const proxy = require('../proxy-travelfusion');
const config = require('../config.json');
const helper = require('../travelfusion-request-helper');

const search = async function (checkin, checkout, city, latitude, longitude, currency, adultCount, childCount, budget) {

    let duration = helper.getMomentDate(checkout).diff(helper.getMomentDate(checkin), 'days');

    let res = await proxy.searchHotelPromise(config.travelfusion.hotels.apiEndpoint,
        helper.generateSearchOption(
            checkin, checkout, duration, city, latitude, longitude, currency, adultCount, childCount, budget
        ));

    let jsonObj = JSON.parse(res.body);

    // let result = {
    //     body: jsonObj,
    //     cookies: res.cookies
    // }

    // return result;
    await proxy.delay(5000);

    const options3 = {
        body: `<GetHotelsRequest sid="${jsonObj.GetHotelsResponse.sid}" token="${config.travelfusion.hotels.token}" xmlns="http://www.travelfusion.com/xml/api/simple">` +
            '<filters>' +
            `<filter code="priceMax" currency="${currency}">${budget}</filter>` +
            '</filters>' +
            '</GetHotelsRequest>',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'Cookie': res.cookies,
            // 'Accept-Encoding': 'gzip',
        }
    };
    // console.log('------------------------------------------');
    // console.log('2. Request Header and Body of Second GetHotelRequest');
    // console.log(options3);
    let res2 = await proxy.searchHotelPromise(config.travelfusion.hotels.apiEndpoint, options3);

    // console.log(res2);

    // return res2;
    let jsonObj2 = JSON.parse(res2.body);
    // console.log(jsonObj);
    let hotels = jsonObj2.GetHotelsResponse.results.hotel;
    // console.log('--------------------------------------------');
    // hotels.forEach(function (hotel) {
    //     console.log(hotel.hotelDetails.hotelName);
    //     console.log(hotel.hotelDetails.starRating);

    //     for (let i=0; i < hotel.offers.offer.length ; i++) {
    //         console.log(hotel.offers.offer[i].id);
    //         console.log(hotel.offers.offer[i].price);
    //     }

    // });

    let summary = hotels ? hotels.map(function (hotel){
        return {
            hotelName: hotel.hotelDetails.hotelName,
            address: hotel.hotelDetails.address,
            latitude: hotel.hotelDetails.coordinate.lat,
            longitude: hotel.hotelDetails.coordinate.lon,
            description: hotel.hotelDetails.description,
            starRating: hotel.hotelDetails.starRating,
            thumbnail: hotel.hotelDetails.thumbnail,
            offers: hotel.offers.offer.map(function (offer) {
                return {
                    id: offer.id,
                    priceCurrency: offer.price.currency,
                    priceAmount: offer.price.$t,
                    roomtypes: offer.roomtypes,
                    roomsDesc: offer.rooms.room.type,
                    roomsType: offer.rooms.room.tfType,
                    roomTypeExtraInfo: offer.rooms.room.extraInfos,
                    billingPriceCurrency: offer.billingPrice.currency,
                    billingPriceAmount: offer.billingPrice.$t,
                    // supplier: offer.supplier,  // don't need to disclose
                    extraInfos: offer.extraInfos
                }
            })
        }
    }) : {};

    const result = {
        cookies: res.cookies, // for following call
        seachCriteria: {
            checkin, checkout, city, latitude, longitude, currency, adultCount, childCount, budget
        },
        summary: summary,
    }
    return result;
}

module.exports = {
    search: search
}