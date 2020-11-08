const { HttpConnector, Reshuffle } = require('reshuffle')
const { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } = require('./constants');

/**
 * SERVE STATIC
 */
const express = require('express');
const staticApp = express();

staticApp.use(express.static('./build'));

/**
 * RESHUFFLE API
 */
const app = new Reshuffle()
const httpConnector = new HttpConnector(app, undefined, 'APP')

httpConnector.on({ method: 'GET', path: '/weather/:city' }, async (event, app) => {
    const HTTPConnection = app.getConnector('APP')
    const formattedURL = HTTPConnection.formatURL(`${OPEN_WEATHER_API_URL}weather?q=${event.req.params.city}&units=metric&APPID=${OPEN_WEATHER_API_KEY}`);

    const response = await HTTPConnection.fetch(formattedURL);
    const data = await response.json();

    if (!response.ok) {
        event.res.status(404).send(data)
    } else {
        event.res.status(200).send(data);
    }
})

app.registry.common.webserver = staticApp
app.start();