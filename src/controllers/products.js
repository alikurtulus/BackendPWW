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
    if( !products ){
        const error = new HttpError('Could not find any products',404)
        return next(error)
    }
    res.status(200).json({products:products.map(product => product.toObject({getters:true}))})
  
}
const showRoute = async (req,res,next) => {

    let selectedProduct
    let productId =  req.params.id
    try{
        selectedProduct = await Product.findById(productId).exec()
        if( !selectedProduct ){
            const error = new HttpError('Could not found a product with this provided id', 404)
            return next(error)   
        }
        res.status(200).json(selectedProduct)
    }
    catch(err){
        const error = new HttpError('Something went wrong', 500)
        return next(error)
    }
}
const searchRoute =  async (req, res, next) => {
    try{
        // check  query about department 
        const department = req.query.department ? {department:req.query.department} : {}
        const searchKeyWord = req.query.searchKeyWord ? {
            name:{
                $regex:req.query.searchKeyWord,
                $options:'i'
            }
        } : {}

        const sortOrder = req.query.price
        ? req.query.price === 'descending'
            ? {price:-1}
            : {price: 1}
            : {id: -1};

        const type = req.query.type ? {type:req.query.type} : {}
        const products = await Product.find( {...department, ...searchKeyWord, ...type} ).sort(
            sortOrder
        );
        if(products.length === 0 ){
            const error = new HttpError('Could not find any results', 404)
            return next(error)
        }
        res.status(200).send(products);
    }
    catch(err){
        console.log(err)
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }
    
}
const departmentRoute = async (req, res, next) => {
    try {
        let departments = await Product.distinct('department')
        if( departments ){
            res.status(200).send(departments)
        }
        else{
            const error = new HttpError('Could not find any results', 404)
            return next(error)
        }
    }
    catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong', 500)
        return next(error)
    }
}

const typeRoute = async (req, res, next) => {
    try {
        let allTypes = await Product.distinct('type')
        if( allTypes ){
            res.status(200).send(allTypes)
        }
        else{
            const error = new HttpError('Could not find any results', 404)
            return next(error)
        }
    } catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong', 500)
        return next(error)
    }
}

module.exports = {
    index: indexRoute,
    show:showRoute,
    search:searchRoute,
    getDepartments:departmentRoute,
    getTypes:typeRoute
    
}