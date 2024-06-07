const express = require("express");;
const router = express.Router();

const {ProductOrdersDetails,addProducts,addnewproducts,getproducts,Updateproducts,Deleteproduct,ProductOrders} = require('../controllers/products')

router.route('/getProducts').get(addProducts)
router.route('/addproduct').post(addnewproducts)
router.route('/products').get(getproducts)
router.route('/update/product').get(Updateproducts)
router.route('/delete/product/:id').get(Deleteproduct)
router.route('/product/order').get(ProductOrders)
router.route('/product/orderdetails').get(ProductOrdersDetails)

module.exports = router;