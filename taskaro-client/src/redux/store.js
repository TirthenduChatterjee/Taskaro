import { configureStore} from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
