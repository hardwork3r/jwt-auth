const {Schema, model} = require('mongoose');

const PurchaseSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, unique: true, required: true}
})

module.exports = model('Purchase', PurchaseSchema);