import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total cost for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for the whole cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would reach 0, so remove the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-total-amount">Total Cart Amount: ${calculateTotalAmount()}</div>

      {cart.length === 0 && <div className="cart-empty">Your cart is empty. Add some plants to get started.</div>}

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: ${item.cost}</div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name} quantity`}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
            </div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="checkout-btn" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
