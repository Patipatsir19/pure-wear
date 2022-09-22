import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const PaymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ amount: amount * 100 })
    }).then((res) => res.json());

    const {paymentIntent: {client_secret}} =  response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billng_details: {
                name: currentUser ? currentUser.displayName : "guest",
            }
        }
    });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error.message)
        }else {
            if(paymentResult.paymentIntent.status === "succeeded") {
                alert('Payment successful!')
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={PaymentHandler}>
                <h2>Credit Card Payment: </h2>
            <CardElement/>
            <PaymentButton
                disabled={isProcessingPayment}
                buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;