const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    PName:{type: String, required: true, trim: true},
    PDescription:{type: String, required: true},
    PCategory:{type: String, required: true},
    PBrand:{type: String, required: true},
    PAmount:{type: Number, required: true},
    PPrice:{type: Number, required: true},
    PImage:{type: String}
},{
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;