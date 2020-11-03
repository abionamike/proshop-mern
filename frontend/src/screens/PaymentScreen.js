import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col  } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { savePaymetMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('paypal');
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymetMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="PaymetMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        {/* <Form.Check type="radio" label="Stripe" id="Stripe" name="PaymetMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen

