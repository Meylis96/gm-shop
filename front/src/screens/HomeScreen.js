import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');

            setProducts(data);
        }

        fetchProducts();
    }, []);


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


