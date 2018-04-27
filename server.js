const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');

const db = require('./models');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const apiRoutes = require('./routes/apiRoutes.js');
app.use(apiRoutes);

app.listen(PORT, function() {
    console.log('App now listening at localhost: ' + PORT);
});