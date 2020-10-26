import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };


    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                На главную
            </Link>
        {loading ? <Loader/> : error ? <Message varient="danger">{error}</Message> : 
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup varint="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} отзыв(ов)`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Цена: {product.price} TMT
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Описание: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Цена:
                                    </Col>
                                    <Col>
                                        <strong>{product.price} TMT</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Статус:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Количество</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                    Добавить в корзину
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        }   
        </>
    )
}

export default ProductScreen;
