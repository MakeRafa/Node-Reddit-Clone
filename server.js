//REQUIRE LIBRARIES
require('dotenv').config()

var express = require('express');
var exphbs  = require('express-handlebars');

const cookieParser = require('cookie-parser');

const checkAuth = require('./middleware/checkAuth');
//APP SETUP
var app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Add this after you initialize express.
app.use(cookieParser());

app.use(checkAuth);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require('./controllers/auth.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/posts')(app);
require('./data/reddit-db');

module.exports = app;

// Start Server
app.listen(3000, () => {
    console.log('Reddit Clone listening on port localhost:3000!');
});
