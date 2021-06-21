// Require Libraries
const express = require('express');

// App Setup
const app = express();
const port = 3000
// Middleware

// Routes
app.get('/', (req, res) => {
    res.render('main')
})

// app.get('/posts/new', (req, res) => {
//     res.render('new post')
// })

// Start Server

app.listen(3000, () => {
    console.log('Reddit Clone listening on port localhost:3000!');
});