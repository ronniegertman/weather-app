const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')) )

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Ronnie'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About me',
        name: 'Ronnie'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'Help Page',
        message: 'For help, contact me at',
        email: 'mailto:ronniegert2707@gmail.com',
        name: 'Ronnie'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'You must provide an address'})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, Weatherdata) => {
            if(error){
                return res.send({error: error})
            }

            res.send({ forecast: Weatherdata, location, address: req.query.address})
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({error: 'You must provide a search term'})
    }

    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        name: 'Ronnie',
        title: 'Error 404',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs',{
        name: 'Ronnie',
        title: 'Error 404', 
        message: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})