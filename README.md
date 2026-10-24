# ReactApp Store

A mini e-commerce storefront built with **React & Redux** — product catalog, cart, checkout with dynamic VietQR payment codes, favorites, and role-based routing.

> This is a portfolio project. The app source lives in [`product-store/`](./product-store).

## Features

- **Product catalog** — browse products from a public REST API with category filter, sorting (price/name), search, and pagination
- **Product detail pages** with descriptions and specs
- **Cart** — add/remove, quantity stepper, badge counter; carts are **separated per account** (switching users never mixes carts)
- **Checkout** — validated form (name, Vietnamese phone number, address) with **dynamic VietQR payment codes**: the total is converted to VND and a QR following the national VietQR standard is generated, so bank apps auto-fill account, amount, and order reference
- **Favorites** — save products to a personal list
- **Auth & role-based routing** — login session managed by Redux + `localStorage`; protected routes; **Admin** can manage the product list (add/edit/delete), **Customer** is blocked from admin pages with a 403 page
- **Custom UI** — hand-built modal dialogs (replacing browser `alert`/`confirm`) and auto-dismissing toast notifications
- Lazy-loaded routes, glassmorphism login screen, responsive Bootstrap layout

## Tech stack

React (Create React App) · React Router · Redux Toolkit · Axios · Bootstrap 5.3 · localStorage

## Getting started

```bash
cd product-store
npm install
npm start
```

The app runs at `http://localhost:3000`. No backend or database to set up — it talks to a free public product API.

**Demo accounts**

| Role     | Username   | Password   |
|----------|------------|------------|
| Admin    | `admin`    | `admin`    |
| Customer | `customer` | `customer` |

## Project structure

```
product-store/
├── src/
│   ├── api.js                  # Axios instance (public product API)
│   ├── App.js                  # Router, navbar, global modals/toasts
│   ├── store.js                # Redux store: auth, cart, favorites, toast slices
│   ├── components/
│   │   ├── ProductCard.jsx     # Product card (functional component)
│   │   ├── ProductCardClass.jsx# Product card (class component)
│   │   ├── AddProductForm.jsx  # Admin add-product form with validation
│   │   ├── ProtectedRoute.jsx  # Auth + role guard for routes
│   │   ├── CustomModal.jsx     # Custom confirm/alert dialogs
│   │   └── NotificationToast.jsx
│   └── pages/
│       ├── Home.jsx            # Catalog: filter, sort, search, pagination
│       ├── ProductList.jsx     # Admin inventory management
│       ├── ProductDetail.jsx
│       ├── EditProduct.jsx     # Admin-only
│       ├── Cart.jsx
│       ├── Checkout.jsx        # Form + VietQR payment
│       ├── Favorites.jsx
│       └── Unauthorized.jsx    # 403 page
```

## Screenshots

_Add screenshots here — e.g. `docs/screenshots/home.png` — they make the biggest difference on a portfolio repo._

## Credits

- Product data: [FakeStoreAPI](https://fakestoreapi.com) (free public API for prototyping)
- VietQR codes: generated via the national VietQR standard ([vietqr.io](https://vietqr.io))
