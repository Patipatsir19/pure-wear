import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {CartDropdownContainer, EmptyMassage, CartItems } from './cart-dropdown.styles'

import CartItem from '../cart-item/cart-item.component'
import Button from '../button/button.component'
import { selectCartItems } from '../../store/cart/cart.selector'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? 
                    (cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)
                    ) : (
                        <EmptyMassage>Your Cart Is Empty</EmptyMassage>
                    )
                }
                
            </CartItems>
            <Button onClick={goToCheckOutHandler} >Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;