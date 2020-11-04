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
        name: 'Название продукта',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Название бренда',
        category: 'Категория товара',
        countInStock: 0,
        numReviews: 0,
        description: "Описание продукта"
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

// @descr        Create a new review
// @route        POST /api/products/:id/reviews
// @acess        Private

const createProductReview = asyncHandler(async (req, res) => {

    const {rating, comment} = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Вы уже оставили отзыв')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message: "Отзыв добвален"})
    } else {
        res.status(404)
        throw new Error("Товар не найден")
    }
    
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview };
