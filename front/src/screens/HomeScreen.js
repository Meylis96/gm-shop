import React from 'react';
import products from '../products';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
    return (
        <>
            <h1>Новые товары</h1>
            <Row>
                {products.map((product) => 
                    (
                        <Col sm={4} md={2} lg={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    )
                )}
            </Row>
        </>
    )
}

export default HomeScreen;


