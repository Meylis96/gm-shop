import React from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart); 

    // Calculate prices
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    cart.shippingPrice = Number(cart.cartItems < 500 ? 100 : 10);

    cart.taxPrice = Number(0);

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

    const placeOrderHandler = () => {
        console.log('Order');
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4  />
            
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Доставка</h2>
                            <p>
                                <strong>Адрес: </strong> 
                                {cart.shippingAddress.address}, <br/>
                                <strong>Город: </strong> 
                                {cart.shippingAddress.city}, <br/>
                                <strong>Номер: </strong> 
                                {cart.shippingAddress.number},
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Способ оплаты</h2>
                            <strong>Способ: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Товары: </h2>
                            {cart.cartItems.length === 0 ? <Message>Ваша корзина пуста</Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>{cart.itemsPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Доставка</Col>
                                    <Col>{cart.shippingPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Налоги</Col>
                                    <Col>{cart.taxPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Общая сумма</Col>
                                    <Col>{cart.totalPrice} TMT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.Items === 0} onClick={placeOrderHandler}>Подтвердить</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen;
