import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id)

if(existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
    {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    ); 
}

    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, cartItemToRomove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRomove.id);
    //Check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRomove.id);
    }
    //return back cartitem with matching cart item with reduce quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRomove.id ? 
    {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    ); 
}

const clearCartItem = (cartItems, cartItemToClear) =>  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart:() => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newcartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,
        0
    );
        setCartCount(newcartCount);
    }, [cartItems])

    useEffect(() => {
        const newcartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    );
        setCartTotal(newcartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItem(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItem(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal
    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}