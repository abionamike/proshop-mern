import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card  } from 'react-bootstrap';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    let { shippingAddress, cartItems, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);

    taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

    totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    let { order, success, error } = orderCreate;

    const placeOrderHandler = () => {
        dispatch(createOrder({ orderItems: cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice }));
    }

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`);
        }
    }, [history, success, order])

    return (
        <>
         <CheckoutSteps step1 step2 step3 step4 />   
         <Row>
            <Col md={8}>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cartItems.length === 0 ? (<Message>Your Cart is empty</Message>) : 
                                            (<ListGroup variant='flush'>
                                                {cartItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>)}
                </ListGroup.Item>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
         </Row>
        </>
    )
}

export default PlaceOrderScreen
