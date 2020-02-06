const {Router} = require('express');
const router = Router();
const path = require("path");

/**
 * router for home page*/

router.get('/', (req, res) => {
    res.sendFile( 'index.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;