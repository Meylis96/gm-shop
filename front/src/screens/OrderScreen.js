import React, {useEffect} from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({match}) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;

    if(!loading){
        order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        // eslint-disable-next-line 
    }, [])


    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
        <h1>Заказ: {order._id}</h1>

        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Доставка</h2>
                            <p>
                                <strong>Адрес: </strong> 
                                {order.shippingAddress.address}, <br/>
                                <strong>Город: </strong> 
                                {order.shippingAddress.city}, <br/>
                                <strong>Номер: </strong> 
                                {order.shippingAddress.number},
                            </p>
                            {order.isDelivered ? <Message varient="success">Доставлено</Message> : <Message varient="danger"><strong>Статус: </strong>Не доставлено</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Способ оплаты</h2>
                            <p>
                            <strong>Способ: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message varient="success">Оплачено</Message> : <Message varient="danger"><strong>Статус: </strong>Не оплачено</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Товары: </h2>
                            {order.orderItems.length === 0 ? <Message>Ваша корзина пуста</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} TMT = {item.qty * item.price} TMT
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Итоги</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Сумма товаров</Col>
                                    <Col>{order.itemsPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Доставка</Col>
                                    <Col>{order.shippingPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Налоги</Col>
                                    <Col>{order.taxPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Общая сумма</Col>
                                    <Col>{order.totalPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen;
