import React, {useState} from 'react';
import { Form, Button, Col  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress){
        history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Наличными');

    const dispatch = useDispatch();
    const disableBtn = document.querySelector('#creditCard');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Способ оплаты</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">
                        Выберите способ оплаты 
                    </Form.Label>
                <Col>
                    <Form.Check 
                        type="radio" 
                        label="Наличный расчет" 
                        id="cash" 
                        name="paymentMethod" 
                        value="cash" 
                        checked 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                    </Form.Check>

                    <Form.Check 
                        type="radio" 
                        label="Безналичный расчет (Появится позжe)" 
                        id="creditCard" 
                        name="paymentMethod" 
                        value="CreditCard" 
                        disabled
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                    </Form.Check>
                </Col>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={disableBtn}>Продолжить</Button>
            </Form>
        </FormContainer>
    )
};

export default PaymentScreen;