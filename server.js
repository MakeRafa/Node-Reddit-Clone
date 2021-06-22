var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('main', (req, res) => {
    res.render('main', {});
})
// Start Server

app.listen(3000, () => {
    console.log('Reddit Clone listening on port localhost:3000!');
});