require('dotenv').config()
const mongoose = require('mongoose')
const { dbUri } = require('./config/environment')
const Product = require('./models/Product')
const products = require('./db/products.json')

mongoose.connect(dbUri, (err,db) => {
    
    db.dropDatabase()
    .then(() => {
        return Product.create(products)
    })
    .then(() => mongoose.connection.close()) // disconnect from the database
    .catch(err => {
      console.log(err) // log any errors
      mongoose.connection.close() // disconnect from the database
    })
},{ useNewUrlParser: true, useUnifiedTopology: true} )