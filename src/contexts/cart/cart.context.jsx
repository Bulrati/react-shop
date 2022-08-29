import {createContext, useEffect, useState} from "react";
import cartItemComponent from "../../components/cart-item/cart-item.component";

const addCartItem = (cartItems, productToAdd) => {
    const isProductInCart = cartItems.find(item => item.id === productToAdd.id);

    if (isProductInCart) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const deleteCartItem = (cartItems, cartItem, isForceDelete = false) => {
    const productInCart = cartItems.find((item) => cartItem.id === item.id);

    if (productInCart) {
        if (productInCart.quantity < 2 || isForceDelete) {
            return cartItems.filter((item) => item.id !== cartItem.id);
        } else {
            return cartItems.map((item) => item.id === cartItem.id ? {...item, quantity: item.quantity - 1} : item)
        }
    }

    return cartItems;
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    deleteItemFromCart: () => null,
    cartCount: 0,
    total: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
        setTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const deleteItemFromCart = (cartItem, isForceDelete = false) => {
        setCartItems(deleteCartItem(cartItems, cartItem, isForceDelete));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, deleteItemFromCart, total};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
