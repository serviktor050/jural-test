import { configureStore } from '@reduxjs/toolkit';
import partsReducer from '../features/parts/partSlice.js';

export const store = configureStore({
    reducer: { parts: partsReducer },
});