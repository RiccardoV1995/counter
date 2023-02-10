import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../features/user/userSlice'
import counterSlice from '../features/counter/counterSlice';
import countersSlice from '../features/counters/countersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    counter: counterSlice,
    counters: countersSlice,
  },
});
