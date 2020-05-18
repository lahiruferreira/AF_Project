const express = require('express');
const app = express();
const cors = require('cors');
const connectToDatabase = require('./config/connectToDatabase');

app.use(cors());
app.use(express.json({extended: false}));

app.use('/api/users', require('./routes/users'));
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart')

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart',cartRouter);
/*app.get(
    '/',
    (req,res) => {
        res.send('hello')
    }
)*/
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log('Server is running on PORT', PORT))