const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const User = require('./models/user');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById(('63e3db2f2447478fa9eca755')).then(user => { console.log(user); req.user = user; next(); })
        .catch(err => console.log(err))
})

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