const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)



const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        value:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            required:true
        }
    },
    type:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    }

})

productSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Product',productSchema)