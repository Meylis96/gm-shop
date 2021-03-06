import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name);
                setEmail(user.email)
            }
        }
        // eslint-disable-next-line
    }, [dispatch, history, userInfo, user]);

    const submitHandler = e => {
        e.preventDefault();
        // UPDATE PROFILE
        if(password !== confirmPassword) {
            setMessage('Пароли не совпадают');
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }


    return ( 
        <Row>
            <Col md={3}>
            <h2>Профиль пользователя</h2>
                {message && <Message varient="danger">{message}</Message>}
                {error && <Message varient="danger">{error}</Message>}
                {success && <Message varient="success">Ваш профиль обновлен</Message>}
                {loading && <Loader/>}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId="name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control 
                            type="name"
                            placeholder="Введите имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>E-mail адрес</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="Введите свою эл. почту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Введите пароль еще раз"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                    </Form.Group>

                    <Button type="submit" varient="primary">Обновить</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>Мои заказы</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders}</Message> :(
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ДАТА</th>
                                <th>ОБЩАЯ СУММА</th>
                                <th>ОПЛАЧЕНО</th>
                                <th>ДОСТАВЛЕНО</th>
                                <th>ДЕТАЛИ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? <i className="fas fa-check" style={{color: 'green'}}></i> : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                    <td>{order.isDelivered ? <i className="fas fa-check" style={{color: 'green'}}></i> : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">
                                                Посмотреть
                                            </Button>
                                        </LinkContainer>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) }
            </Col>
        </Row>
    )
}

export default ProfileScreen;
