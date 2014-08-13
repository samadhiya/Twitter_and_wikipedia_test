var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'vjG0lLiNCgdrCdX3ouCDCfTbz',
    consumer_secret: 'EQlpMNPb91Lf6FkT4Qsbow7cTm1M65pCRm73PLnfMgOzl5MAM9',
    access_token_key: '43637684-TDzNnJeOMMVwlJfF4p4oTHfvgqeGY2IRjGpAIMNne',
    access_token_secret: 'nvAPiEvRJ94b7nB6etrHOWgNvTmWtH5aEgF2dUNf0HerB'
});

var wikipedia = require("wikipedia-js");


var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(__dirname + '/bower_components'));


app.use('/', routes);
app.use('/api/twitter', function(req, res) {
    twit.search('node.js', function(data) {
        console.log(util.inspect(data));
        res.json(data);
    });
});
app.use('/api/wiki/:query', function(req, res) {
    var query = req.params.query; 

    if(query.split(' ').length > 1) {
        res.json({'content': 'Content not found.'});
    }
    // if you want to retrieve a full article set summaryOnly to false.
    // Full article retrieval and parsing is still beta
    var options = {query: query, format: "html", summaryOnly: true};
    wikipedia.searchArticle(options, function(err, htmlWikiText){
        console.log('content= ' + htmlWikiText);
        if(err){
            res.json({'content': 'Content not found.'});
        }
        if(htmlWikiText === null || (htmlWikiText !== null && htmlWikiText.trim() === "")) {
            res.json({'content': 'Content not found.'});   
        }
        res.json({'content': htmlWikiText});
    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//TODO: Fis this mess
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
