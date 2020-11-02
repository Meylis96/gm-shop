import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @descr        Create new order
// @route        POST /api/orders
// @acess        Private

const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Не удалось найти заказы')
    } else {
        const order = new Order({
            orderItems,
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


// @descr        Get Order by ID
// @route        GET /api/orders:id
// @acess        Private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order) {
        res.json(order);
    } else {
        res.status(404)
        throw new Error("Заказ не найден");
    }
});

// @descr        Get logged in user orders
// @route        GET /api/orders/myorders
// @acess        Private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @descr        Get all orders
// @route        GET /api/orders/orders
// @acess        Private

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ }).populate('user', 'id name');
    res.json(orders);
});

export {addOrderItems, getOrderById, getMyOrders, getOrders};