import express from 'express';
const router = express.Router();
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';



// @descr        Fetch all products
// @route        GET /api/products
// @acess        Public

router.get('/', expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});

    res.json(products);
}));

// @descr        Fetch single product
// @route        GET /api/products/:id
// @acess        Public

router.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Товар не найден!' })
    }
    
}));

export default router;