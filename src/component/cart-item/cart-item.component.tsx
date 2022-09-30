import { FC } from "react";


import { CartItem as TcartItem } from "../../store/cart/cart.types";

import { CartItemContainer, ItemsDetails } from "./cart-item.styles";

type CartItemProps = {
    cartItem: TcartItem
}

const CartItem: FC<CartItemProps> =({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemsDetails>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ฿{price}
                </span>
            </ItemsDetails>
        </CartItemContainer>
    )
}

export default CartItem;