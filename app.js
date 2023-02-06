const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const { findById } = require('./models/product');

app.use((req, res, next) => { findById("63df754bf23d8921f2b68db5").then(user => { req.user = user; next(); })
.catch(err => console.log(err)) })

app.use('/admin', adminRouter);
app.use(shopRouter);

mongoose.connect('mongodb://127.0.0.1:27017/Shop')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'hadi',
                    email: 'hadi@hadi',
                    cart: { items: [] }
                })
                user.save()
            }
        })

    })
    .then(result => { app.listen(3000, () => { console.log('Listening on port 3000') }); })
    .catch(err => { console.log(err); })