const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDatabase } = require('./src/config/dbConfig');
const { globalErrorHandler } = require('./src/exception/errorHandler');
const path = require('path');
require('dotenv').config()

const userRoutes = require('./src/routes/user.route')
const colorRoutes = require('./src/routes/color.route')
const productRoutes = require('./src/routes/product.route')
const orderRoutes = require('./src/routes/order.route')

const app = express();
const port = 4000

app.use(cors({ origin: '*' }))
app.use(bodyParser.json());
app.use('/src/uploads', express.static(path.resolve(__dirname + '/src/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(globalErrorHandler)

app.listen(port, function (error) {
    if (error) console.log('Error in server setup', error);
    console.log(`App listening on ${port}`)
    connectDatabase()
})