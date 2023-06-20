import { getShoppingCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products data
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    //get cart
    const savedCart = getShoppingCart();
    const initialCart = [];
    // console.log(products);
    for(const id in savedCart){
        // find korbo product tehke id ke cause amr specific ekta products thakbe ekta id te filter use korbo jkhn onk gulo dorkar
        const addedProduct = products.find(product => product.id === id);
        // condition dibo jodi kono product cart a na thake tahole check kore dekhbe module 53 video 4 from 10 minutes
        if(addedProduct){
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }


    return {products, initialCart};
}