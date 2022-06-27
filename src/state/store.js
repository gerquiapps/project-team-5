import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user.reducer';
import { themeReducer } from './reducers/theme.reducer';
import { playerReducer } from './reducers/player.reducer';

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    player: playerReducer
  }
})