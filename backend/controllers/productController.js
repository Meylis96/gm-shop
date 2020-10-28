import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// @descr        Fetch all products
// @route        GET /api/products
// @acess        Public


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products)
});


// @descr        Fetch single product
// @route        GET /api/products/:id
// @acess        Public

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Товар не найден');
    }

    res.json(products)
});

export { getProducts, getProductById };
