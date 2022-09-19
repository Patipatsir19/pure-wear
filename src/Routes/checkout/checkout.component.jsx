import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../component/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>PRODUCT</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>DESCRIPTION</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>QUANTITY</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>PRICE</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>REMOVE</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) =>
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <Total>Total: ฿{cartTotal}</Total>
        </CheckoutContainer>
       
    )
}

export default CheckOut;