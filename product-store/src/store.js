import { configureStore, createSlice } from "@reduxjs/toolkit";

// Reusable helpers to get current user and cart keys
const getCurrentUser = () => {
  try {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (e) {
    return null;
  }
};

const getCartKey = () => {
  const user = getCurrentUser();
  return user ? `cart_${user.username}` : "cart_guest";
};

const getInitialFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const getInitialCart = () => {
  try {
    const key = getCartKey();
    const savedCart = localStorage.getItem(key);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    return [];
  }
};

const savedUser = getCurrentUser();

// Favorites Slice (LO8)
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: getInitialFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter((id) => id !== productId);
      } else {
        state.items.push(productId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

// Auth Slice for Login / Logout and Role Authorization
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: savedUser,
    isAuthenticated: !!savedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload; // { username, role, name }
      state.isAuthenticated = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
  },
});

// Cart Slice to manage shopping cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCart(), // Initialized based on current user
  },
  reducers: {
    loadUserCart: (state) => {
      state.items = getInitialCart();
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => String(item.id) === String(product.id)
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Safe check for price format
        const numericPrice = typeof product.price === "string" 
          ? parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 0
          : product.price;

        state.items.push({
          id: product.id,
          title: product.title || product.name, // FakeStore uses title, local DB uses name
          price: numericPrice,
          image: product.image,
          quantity: quantity,
        });
      }
      const key = getCartKey();
      localStorage.setItem(key, JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => String(item.id) !== String(id));
      const key = getCartKey();
      localStorage.setItem(key, JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => String(item.id) === String(id));
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
      const key = getCartKey();
      localStorage.setItem(key, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      const key = getCartKey();
      localStorage.removeItem(key);
    },
  },
});

// Toast Slice for floating notifications
const toastSlice = createSlice({
  name: "toast",
  initialState: {
    show: false,
    message: "",
    type: "success", // success, danger, info, warning
  },
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const { loginSuccess, logoutSuccess } = authSlice.actions;
export const { addToCart, removeFromCart, updateQuantity, clearCart, loadUserCart } = cartSlice.actions;
export const { showToast, hideToast } = toastSlice.actions;

const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    toast: toastSlice.reducer,
  },
});

export default store;
