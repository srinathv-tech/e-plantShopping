# Paradise Nursery – Shopping Cart Application

**Project name:** Paradise Nursery (e-plantShopping)

Paradise Nursery is an online plant shop built with React and Redux Toolkit. Visitors land on a
branded home page, browse houseplants grouped by category, add plants to a shopping cart, and
manage their order.

## Features

- Landing page with the company name, background image, About Us section and a **Get Started** button
- Product listing with 3 categories and 6 plants each (thumbnail, name, description, price)
- **Add to Cart** button that disables once the plant is in the cart
- Navbar on both the Plants and Cart pages with Home, Plants and Cart links
- Cart icon showing the total number of items, updated dynamically
- Cart page with per-plant subtotal, total cart amount, increase/decrease buttons and delete button
- **Checkout** button (shows "Coming Soon") and **Continue Shopping** button

## Tech stack

- React (Vite)
- Redux Toolkit / React-Redux
- CSS

## Run locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  App.jsx          Landing page
  App.css          Styles (including landing background image)
  AboutUs.jsx      Company details
  ProductList.jsx  Plant listing and navbar
  CartItem.jsx     Shopping cart page
  CartSlice.jsx    Redux slice (addItem, removeItem, updateQuantity)
  store.js         Redux store
  main.jsx         App entry point
```
