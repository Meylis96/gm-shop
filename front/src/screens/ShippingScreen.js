import React, {useState} from 'react';
import { Form, Button  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [number, setNumber] = useState(shippingAddress.number);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, number}));
        history.push('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Доставка</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Введите адрес"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>Город</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Введите город"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="number">
                    <Form.Label>Номер</Form.Label>
                    <Form.Control 
                        type="tel"
                        placeholder="Введите номер"
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Продолжить</Button>
            </Form>
        </FormContainer>
    )
};

export default ShippingScreen;