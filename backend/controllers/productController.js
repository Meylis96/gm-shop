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

// @descr        Delete product
// @route        DELETE /api/products/:id
// @acess        Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(product) {
        await product.remove();
        res.json({
            message: 'Товар удален'
        })
    } else {
        res.status(404);
        throw new Error('Товар не найден');
    }

    res.json(products)
});

// @descr        Create product
// @route        POST /api/products/
// @acess        Private/Admin

const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @descr        Update a product
// @route        POST /api/products/:id
// @acess        Private/Admin

const updateProduct = asyncHandler(async (req, res) => {

    const {name, price, description, image, brand, category, countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404)
        throw new Error("Товар не найден")
    }
    
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
