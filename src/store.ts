import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';

// Cấu hình store với các reducers
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// Cung cấp kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
