import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @descr        Create new order
// @route        POST /api/orders
// @acess        Private


const addOrderItems = asyncHandler(async (req, res) => {
    const { addOrderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Не удалось найти заказы')
    } else {
        const order = new Order({
            addOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }

    res.json(products)
});

export {addOrderItems};