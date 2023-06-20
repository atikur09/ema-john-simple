import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import './Orders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';


const Orders = () => {
    const {products, initialCart} = useLoaderData() //initialCart imported from productsAndCartLoader
    const [cart, setCart] = useState(initialCart);
    
    const handelRemoveItem = (id) =>{
        /* ei function ke props hisebe Review item a pathate hbe Niche orders-container er moddo r reviewitem theke destructure kore receive korte hbe karon as i know react is one way binding */

        const remainingProducts = cart.filter(product => product.id !== id);
        setCart(remainingProducts);
        removeFromDb(id); // remove frome database/localstorage otherwise removed item will get back once browser is refreshed!!!!
        /* filter korar karon holo filter korle sob gula item ke  pay r find korle sudu ekta r !==id dewar karon holo id jeta mil hbe seta remove korbo video: module 53 video-8 from 11min*/
    }

    const clearCart = () =>{
        setCart([]); 
        deleteShoppingCart(); //function called from utilities/fakedb
    }

    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map( product => <ReviewItem
                        key={product.id}
                        product={product}
                        handelRemoveItem={handelRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>No Item to Review. Please Visit <Link to='/'>Shop</Link></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to="/">
                        <button className='btn-order-page'>
                            Back to Shop
                            <FontAwesomeIcon className='btn-icon' icon={faBackward}></FontAwesomeIcon>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;