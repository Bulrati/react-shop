import './cart-icon.styles.scss';
import {ReactComponent as ShoppingCartIcon} from '../../assets/shopping-bag.svg'
import {useContext, useEffect} from "react";
import {CartContext} from "../../contexts/cart/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const handleOnClick = (event) => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <div className='cart-icon-container' onClick={handleOnClick}>
            <ShoppingCartIcon className='shopping-cart-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    );
}

export default CartIcon;
