'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    verify = require('./verify'),
    forecaster = require('./forecaster');

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));


app.get('/', function(req, res) {
    res.json({ message: 'The forecaster is up and running.', since: (new Date()).toString() });
});
app.post('/forecast', verify, forecaster);


app.listen(app.get('port'), function() {
    console.log('Forecaster is up and running on port %d', app.get('port'));
});
