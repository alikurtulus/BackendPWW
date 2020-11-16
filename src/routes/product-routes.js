const router = require('express').Router()
const productsController = require('../controllers/products')

router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)
router.get('/search', productsController.search)



module.exports = router