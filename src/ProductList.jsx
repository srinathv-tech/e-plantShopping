import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

// Replace any image URL below if one doesn't load for you.
const IMG = {
  a: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
  b: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
  c: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
  d: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
  e: 'https://cdn.pixabay.com/photo/2020/02/05/00/22/ficus-4819673_1280.jpg',
  f: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
};

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: IMG.a, description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: IMG.b, description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: IMG.c, description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: IMG.d, description: 'Adds humidity and removes toxins.', cost: 20 },
      { name: 'Rubber Plant', image: IMG.e, description: 'Easy-care plant that absorbs airborne toxins.', cost: 17 },
      { name: 'Aloe Vera', image: IMG.f, description: 'Purifies air and soothes minor burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: IMG.c, description: 'Calming scent that helps with relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: IMG.d, description: 'Sweet floral fragrance that fills a room.', cost: 18 },
      { name: 'Rosemary', image: IMG.a, description: 'Fragrant herb used in cooking and aromatherapy.', cost: 15 },
      { name: 'Mint', image: IMG.b, description: 'Refreshing aroma, great for teas and cooking.', cost: 12 },
      { name: 'Lemon Balm', image: IMG.e, description: 'Lemon-scented leaves that calm the mind.', cost: 14 },
      { name: 'Hyacinth', image: IMG.f, description: 'Bold spring blooms with a strong, sweet scent.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Jade Plant', image: IMG.f, description: 'Long-lived succulent said to bring good luck.', cost: 16 },
      { name: 'Echeveria', image: IMG.e, description: 'Rosette-shaped succulent in soft blue-green tones.', cost: 13 },
      { name: 'Barrel Cactus', image: IMG.a, description: 'Round, slow-growing cactus for sunny windows.', cost: 19 },
      { name: 'Zebra Haworthia', image: IMG.b, description: 'Compact succulent with white-striped leaves.', cost: 12 },
      { name: 'String of Pearls', image: IMG.d, description: 'Trailing plant with bead-like leaves.', cost: 21 },
      { name: 'Burro\'s Tail', image: IMG.c, description: 'Hanging stems covered in plump, tear-shaped leaves.', cost: 18 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleHome = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  // A plant counts as "added" only while it is actually in the cart,
  // so deleting it from the cart re-enables its button.
  const isInCart = (name) => addedToCart[name] && cartItems.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="brand">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#home" onClick={handleHome}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" onClick={handleCartClick} className="cart-link" aria-label="Shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="34" width="34">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12" fill="#fff"></circle>
              <circle cx="184" cy="216" r="12" fill="#fff"></circle>
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,180,176H84.4a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
              ></path>
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-cards">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="description">{plant.description}</p>
                    <div className="price">${plant.cost}</div>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
