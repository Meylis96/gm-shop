import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import powder from './categories/images/powder.jpg';
import paper from './categories/images/paper.jpg';
import soap from './categories/images/soap.jpg';
import deodorant from './categories/images/deodorant.jpg';
import shampoo from './categories/images/shampoo.jpg';

const Category = () => {
    return (
        <>
            <h1>Категория товаров</h1>

            <Row>
                <Col>
                    <Link to="/category/powders">
                        <Image src={powder} alt="powders"/>
                    </Link>
                </Col>
                
                <Col>
                    <Link to="/category/soaps">
                        <Image src={soap} alt="soaps"/>
                    </Link>
                </Col>

                <Col>
                    <Link to="/category/shampoos">
                        <Image src={shampoo} alt="shampoos"/>
                    </Link>
                </Col>

                <Col>
                    <Link to="/category/deodorants">
                        <Image src={deodorant} alt="deodorants"/>
                    </Link>
                </Col>

                <Col>
                    <Link to="/category/papers">
                        <Image src={paper} alt="powders"/>
                    </Link>
                </Col>

            </Row>
        </>
    )
}

export default Category;
