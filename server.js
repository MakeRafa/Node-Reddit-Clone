//REQUIRE LIBRARIES
var express = require('express');
var exphbs  = require('express-handlebars');
//APP SETUP
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.get('/', function (req, res) {
    res.render('home');
});

app.get('main', (req, res) => {
    res.render('main', {});
})

require('./controllers/posts')(app);
require('./data/reddit-db');

module.exports = app;

// Start Server
app.listen(3000, () => {
    console.log('Reddit Clone listening on port localhost:3000!');
});
