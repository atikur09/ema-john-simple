import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({product, handelRemoveItem}) => {
    // console.log('review',product);
    const {id, name, price, quantity, shipping, img} = product;
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review-details-container'>
                <div className='review-details'>
                    <p>{name}</p>
                    <p><small>Price: <span>${price}</span></small></p>
                    <p><small>Shipping: <span>${shipping}</span></small></p>
                    <p><small>Quantity: <span>{quantity}</span></small></p>
                </div>
                <div className='delete-container'>
                    <button onClick={() => handelRemoveItem(id)} className='btn-delete'>
                        {/* onclick arrow func a wrap kore dichi karon wrap na korle automatic call hoye jabe function  */}
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;