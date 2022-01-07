const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ffe0c991df486c4d7021dfddad74782f&query=' + latitude + ',' + longitude 
    request({url, json: true}, (error, {body}) =>
    {
        if(error){
            callback('Unable to connect to forecast services', undefined)
        } else if(body.error){
            callback('Unable to find forecast', undefined)
        }else{
            const data = body.current
            const temp = data.temperature
            const feelslike = data.feelslike
            callback(undefined, 'It is ' + temp + ' but it feels like '+ feelslike)

        }

    })
}

module.exports = forecast