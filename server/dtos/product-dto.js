module.exports = class ProductDto {
    id;
    name;

    constructor(model) {
        this.name = model.name;
        this.id = model._id;
    }
}