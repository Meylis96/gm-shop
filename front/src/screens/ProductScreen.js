import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success: successProductReview, error: errorProductReview } = productReviewCreate;

    useEffect(() => {
        if(successProductReview) {
            alert('Отзыв оставлен');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id));
        // eslint-disable-next-line
    }, [dispatch, match, successProductReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, {
            rating, comment
        }))
    }


    return (
        <>
            <Meta title={product.name} />
            <Link className="btn btn-warning" to="/category">
                К категориям
            </Link>
        {loading ? <Loader/> : error ? <Message varient="danger">{error}</Message> : 
        <>
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

            <Row>
                <Col md={6}>
                    <h2>Отзывы</h2>
                    {product.reviews.length === 0 && <Message varient="info">Нет отзывов</Message>}
                    <ListGroup variant="flush">
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}                      
                        <ListGroup.Item>
                            <h2>Оставить отзыв</h2>
                            {errorProductReview && <Message varient="danger">{errorProductReview}</Message>}
                            {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="rating">
                                    <Form.Label>Оценка</Form.Label>
                                    <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Оценить как...</option>
                                        <option value="1">1 - Очень плохо</option>
                                        <option value="2">2 - Плохо</option>
                                        <option value="3">3 - Нормально</option>
                                        <option value="4">4 - Хорошо</option>
                                        <option value="5">5 - Очень хорошо</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="comment">
                                    <Form.Label>Комментарий</Form.Label>
                                    <Form.Control as="textarea" row="3" value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="primary">Подтвердить</Button>
                            </Form>
                            ) 
                                : 
                            <Message>Пожалуйста <Link to="/login">войдите</Link> в систему, чтобы оставить отзыв</Message>}
                        </ListGroup.Item>  
                    </ListGroup>
                </Col>
            </Row>
        </>
        }   
        </>
    )
}

export default ProductScreen;
