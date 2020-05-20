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

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:180*60*100}
}));

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart',cartRouter);

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
/*app.get(
    '/',
    (req,res) => {
        res.send('hello')
    }
)*/
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log('Server is running on PORT', PORT))