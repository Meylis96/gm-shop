import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from './img/logo.svg';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        if(logout) {
            window.location.reload();
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/"><Navbar.Brand><img src={logo} alt="logo"/></Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to="/cart"><Nav.Link><i className="fas fa-shopping-cart"></i> Корзина</Nav.Link></LinkContainer>
                                    {userInfo ? (
                                        <NavDropdown title={userInfo.name} id='username'>
                                            <LinkContainer to="/profile">
                                                <NavDropdown.Item>
                                                    Профиль
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                <Link to="/">Выйти</Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <LinkContainer to="/login"><Nav.Link><i className="fas fa-user"></i> Зарегестрироваться</Nav.Link></LinkContainer>
                                    )}
                                    {userInfo && userInfo.isAdmin && (
                                        <NavDropdown title='Панель' id='adminmenu'>
                                            <LinkContainer to="/admin/userlist">
                                                <NavDropdown.Item>
                                                    Пользователи
                                                </NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/admin/productlist">
                                                <NavDropdown.Item>
                                                    Товары
                                                </NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/admin/orderlist">
                                                <NavDropdown.Item>
                                                    Заказы
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            
                                        </NavDropdown>
                                    )}
                                    </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
    );
}

export default Header;

