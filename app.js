const express = require('express'); // express and middels importing
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');  // mongoose importing
mongoose.set('strictQuery', true);


app.set('view engine', 'ejs');  //views and statics 
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routes/admin');  // routers
const shopRouter = require('./routes/shop');
app.use('/admin', adminRouter);
app.use(shopRouter);

mongoose.connect('mongodb://127.0.0.1:27017/Shop') // mongoose and app to server connections
    .then(result => { app.listen(3000, () => { console.log('Listening on port 3000') }); })
    .catch(err => { console.log(err); })