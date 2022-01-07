const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9ubmllZ2VydG1hbiIsImEiOiJja3huZ2FieHIxemg1Mnh1YmQ3aXZnNnF0In0.GkUr0eAc5w9waS2ajSvgHw&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.message){
            callback('Unable to find location', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            const data = body.features[0].center
            callback(undefined, {
                latitude: data[1],
                longitude: data[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode