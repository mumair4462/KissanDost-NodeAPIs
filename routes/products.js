const express = require("express");;
const router = express.Router();

const {addProducts,addnewproducts,getproducts,Updateproducts,Deleteproduct} = require('../controllers/products')

router.route('/getProducts').get(addProducts)
router.route('/addproduct').post(addnewproducts)
router.route('/products').get(getproducts)
router.route('/update/product').get(Updateproducts)
router.route('/delete/product').post(Deleteproduct)

module.exports = router;