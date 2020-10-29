import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : "/";

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
        // eslint-disable-next-line
    }, [history, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        // DISPATCH REGISTER
        if(password !== confirmPassword) {
            setMessage('Пароли не совпадают');
        }
        dispatch(register(name, email, password));
    }


    return (
        <FormContainer>
            <h1>Зарегистрироваться</h1>
            {message && <Message varient="danger">{message}</Message>}
            {error && <Message varient="danger">{error}</Message>}
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

                <Button type="submit" varient="primary">Зарегистрироваться</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Уже зарегистрированы? {' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Войти</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;
