require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes/product-routes')
const { port, dbUri } = require('./config/environment')


const app = express()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', routes)
mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true})
app.listen(port,() => console.log(`Server is running on port ${port}`))
module.exports = app