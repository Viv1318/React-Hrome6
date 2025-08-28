// store/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: 'Ноутбук',
      description: 'Мощный игровой ноутбук',
      price: 1500,
      available: true
    },
    {
      id: 2,
      name: 'Смартфон',
      description: 'Флагманский смартфон',
      price: 800,
      available: true
    }
  ]
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        product => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedData };
      }
    },
    toggleAvailability: (state, action) => {
      const index = state.products.findIndex(
        product => product.id === action.payload
      );
      if (index !== -1) {
        state.products[index].available = !state.products[index].available;
      }
    }
  }
});

export const { 
  addProduct, 
  deleteProduct, 
  updateProduct, 
  toggleAvailability 
} = productsSlice.actions;

export default productsSlice.reducer;