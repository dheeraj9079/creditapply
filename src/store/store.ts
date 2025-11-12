import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './contentSlice';
import fieldReducer from './fieldSlice';
import themeReducer from './themeSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    field: fieldReducer,
    theme: themeReducer,
    form: formReducer,
  },
});

// Extend the Window interface to include getState
declare global {
  interface Window {
    getState: typeof store.getState;
  }
} 

window.getState = store.getState;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;