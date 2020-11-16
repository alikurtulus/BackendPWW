const Product = require('../models/Product')
const HttpError = require('../models/HttpError')
const indexRoute =  async (req, res, next) => {
    let products

    try{
        products = await Product.find({}).exec()
    }
    catch(err){
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }
    if(!products){
        const error = new HttpError('Could not find any products',404)
        return next(error)
    }
      res.status(200).json({products:products.map(product => product.toObject({getters:true}))})

}
const showRoute = (req,res,next) => {
    try{
        const selectedProduct = products.filter(product => product.id === req.params.id)
        console.log(selectedProduct)
        res.status(200).json(selectedProduct)
    }
    catch(err){
        res.status(500).send({error:'Something went wrong'})
    }

}
const searchRoute =  async (req, res, next) => {

    const department = req.query.department ? {department:req.query.department} : {}
    const searchKeyWord = req.query.searchKeyWord ? {
        name:{
            $regex:req.query.searchKeyWord,
            $option:'i'
        }
    } : {}

   const sortByPrice = req.query.price
   ? req.query.price === 'descending'
    ? {price:1}
    : {price: -1}
    : {id: -1};
    const sortByType = req.query.type ? {type:req.query.type} : {}
    console.log(sortByType)
    console.log(products)
    console.log(typeof products)
    console.log(department)
    console.log(searchKeyWord)
    console.log(sortByPrice)
    const newProducts = await products.filter( p => p.department === department.department && p.type === sortByType.type )
    console.log(newProducts)
    res.send(newProducts)
}

module.exports = {
    index: indexRoute,
    show:showRoute,
    search:searchRoute
    
  }