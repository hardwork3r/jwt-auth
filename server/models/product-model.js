const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    preview: {type: String, required: true},
    name: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
})

module.exports = model('Product', ProductSchema);