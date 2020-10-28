import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-between mb-4" md={6}>
                <Nav.Item className="mr-1">
                    {step1 ? (
                        <LinkContainer to="/login">
                            <Nav.Link>Регистрация</Nav.Link>
                        </LinkContainer>
                    ) : <Nav.Link disabled>Регистрация</Nav.Link>}
                </Nav.Item>

                <Nav.Item className="mr-1">
                    {step2 ? (
                        <LinkContainer to="/shipping">
                            <Nav.Link>Доставка</Nav.Link>
                        </LinkContainer>
                    ) : <Nav.Link disabled>Доставка</Nav.Link>}
                </Nav.Item>

                <Nav.Item className="mr-1">
                    {step3 ? (
                        <LinkContainer to="/payment">
                            <Nav.Link>Оплата</Nav.Link>
                        </LinkContainer>
                    ) : <Nav.Link disabled>Оплата</Nav.Link>}
                </Nav.Item>

                <Nav.Item className="mr-1">
                    {step4 ? (
                        <LinkContainer to="/placeorder">
                            <Nav.Link>Оформить заказ</Nav.Link>
                        </LinkContainer>
                    ) : <Nav.Link disabled>Оформить заказ</Nav.Link>}
                </Nav.Item>
        </Nav>
    )
};

export default CheckoutSteps;
