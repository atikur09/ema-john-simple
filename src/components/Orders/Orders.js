import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

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
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;