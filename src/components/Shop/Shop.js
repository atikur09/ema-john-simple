import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const products = useLoaderData();
    /* const [products, setProducts] = useState([]); */
    const [cart, setCart] = useState([]);

/*    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))

        // 8 number line e gula sudu react use kore korte hbe r jodi router use kori tahole app js er 22 number line er moto kore korte hbe 

    }, []); */

    const clearCart = () =>{
        /* ekhane func declar korar karon holo cart compo te kono state/useState declar kora nei sekhane cart props hisebe pacche tai ekhane declar kore sekhan theke cart er moddo props hisebe pathate hobe niche cart-container er moddo*/
        setCart([]); //kichu na thakle empty array jehetu remove korar por kichu thakbe na
        deleteShoppingCart();
    }


    // code for get item from local storage and display to ui
    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        for(const  id in storedCart){
            const addedProduct = products.find(product => product.id===id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);

    /* https://web.programming-hero.com/update-1/video/update-1-49-6-advanced-display-local-storage-cart-to-the-ui 
    line 27 if condition explaiend in this video from 6 min
    */

    
    const handelAddToCart = (selectedProduct) =>{
        // console.log(product);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product = {product}
                        handelCart = {handelAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    {/* adding children props */}
                    <Link to="/orders">
                        <button className='btn-shop_page'>
                            Review Order
                            <FontAwesomeIcon className='btn-icon' icon={faForward}></FontAwesomeIcon>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;