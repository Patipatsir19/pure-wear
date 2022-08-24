import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../component/checkout-item/checkout-item.component';

import './checkout.styles.scss'

const CheckOut = () => {
    const { cartItems, cartTotal } = useContext(CartContext)

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>PRODUCT</span>
                </div>
                <div className='header-block'>
                    <span>DESCRIPTION</span>
                </div>
                <div className='header-block'>
                    <span>QUANTITY</span>
                </div>
                <div className='header-block'>
                    <span>PRICE</span>
                </div>
                <div className='header-block'>
                    <span>REMOVE</span>
                </div>
            </div>
            {cartItems.map((cartItem) =>
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <span className='Total'>Total: ฿{cartTotal}</span>
        </div>
       
    )
}

export default CheckOut;