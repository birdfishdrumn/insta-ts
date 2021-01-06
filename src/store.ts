import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { immutableStateInvariant,serializableStateInvariant } from "redux-immutable-state-invariant";
// export default counterSlice.reducer;をimportしてる。
// counterReducerは任意の名前
import userReducer from './reducks/users/userSlice';
import postReducer from './reducks/posts/postSlice';
// import likesReducer from './reducks/likes/likesSlice';
import loadingReducer from './reducks/loadingSlice';
import thunk from "redux-thunk";

export const history = createBrowserHistory()

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    //  like: likesReducer,
    loading: loadingReducer,
    // @ts-ignore
     router: connectRouter(history),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
       serializableCheck: false,
    }).concat(routerMiddleware(history)),




})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,

  unknown,
  Action<string>
>;
