const express = require("express");;
const router = express.Router();

const {addProducts} = require('../controllers/products')

router.route('/getProducts').get(addProducts)

module.exports = router;