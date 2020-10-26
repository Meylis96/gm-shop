import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';


const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);


    return (
        <>
            <h1>Новые товары</h1>
            {loading 
                ? ( <Loader/> )
                : error
                ? ( <Message varient="danger">{error}</Message> ) 
                : 
            ( <Row>
                {products.map((product) => 
                    (
                        <Col sm={4} md={2} lg={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    )
                )}
            </Row> )
        }
        </>
    )
}

export default HomeScreen;


