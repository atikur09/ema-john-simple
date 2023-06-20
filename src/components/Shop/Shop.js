import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { useLoaderData } from 'react-router-dom';

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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;