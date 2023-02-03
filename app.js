const express = require('express');                                             // npm i express installed
const bodyParser = require('body-parser');                                       // npm i body-parser installed
const path = require('path');                                                   // npm i path installed

const app = express();                                                          // app uses express 
app.use(bodyParser.urlencoded({ extended: false }));                           // default method to use the body parser

app.set('viw engine', 'ejs');                                                    // Views config for ejs
app.set('views', 'views');                                                      // Views routing

const adminRoute = require('./routes/admin');                                    //name specified to the routes
const shopRoute = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));                        // Static files routing

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));               // sendFile for sendig file through the html---------> example 
// }) 

app.use('/admin', adminRoute);                                                   // admin needed here because it's not the primary root of app
app.use(shopRoute);

app.listen(3000, () => {
    console.log('Runnig on Port 3000...')
});

