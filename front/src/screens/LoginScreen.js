import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : "/";

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
        // eslint-disable-next-line
    }, [history, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        // DISPATCH LOGIN
        dispatch(login(email, password));
    }


    return (
        <FormContainer>
            <h1>Войти</h1>
            {error && <Message varient="danger">{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
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

                <Button type="submit" varient="primary">Войти</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Новый пользователь? {' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Зарегистрироваться</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;
