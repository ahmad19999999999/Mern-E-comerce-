import React, { useEffect, useState } from 'react';
import { AddItemsToCart, removeError, removeItemFromCart, removeMessage } from '../features/cart/Cartslice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { cartItem, loading, error, success, message } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error('Quantity cannot be less than 1', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
      return;
    }
    setQuantity(qty => qty - 1);
  };

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error('This quantity is not available', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
      return;
    }
    setQuantity(qty => qty + 1);
  };

  const handleUpdate = () => {
    if (loading) return;
    if (Number(quantity) !== Number(item.quantity)) {
      dispatch(AddItemsToCart({ id: item.product, quantity }));
    }
  };

  const handleRemove = () => {
   if(loading) return
  dispatch(removeItemFromCart(item.product));
   toast.success('Successfully Remove Item', {
        position: 'top-center',
        autoClose: 3000,
        toastId: 'remove-success',//for one message
      });
};


  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Successfully updated quantity', {
        position: 'top-center',
        autoClose: 3000,
        toastId: 'update-success',//for one message
      });
      dispatch(removeMessage());
    }
  }, [success, dispatch]);

  return (
    <div className='cart-item'>
      <div className='item-info'>
        <img src={item.image} alt={item.name} className='item-image' />
        <div className='item-details'>
          <h3 className='item-name'>{item.categoty}</h3>
          <p className='item-quantity'>
            <strong>Price:</strong> {item.price.toFixed(2)}
          </p>
          <p className='item-quantity'>
            <strong>Quantity:</strong> {item.quantity}
          </p>
        </div>
      </div>

      <div className='quantity-controls'>
        <button className='quantity-button decrease-btn' onClick={decreaseQuantity}>
          -
        </button>
        <input
          type='number'
          value={quantity}
          className='quantity-input'
          readOnly
          min='1'
        />
        <button className='quantity-button increase-btn' onClick={increaseQuantity}>
          +
        </button>
      </div>

      <div className='item-total'>
        <span className='item-total-price'>
          {(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      <div className='item-actions'>
        <button
          className='update-item-btn'
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button className='remove-item-btn' onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
