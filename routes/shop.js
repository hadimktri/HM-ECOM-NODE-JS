const express = require('express')

const router = express.Router() // to use the router feature of express

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router;