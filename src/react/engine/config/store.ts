// Core
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
// Engine
import counterReducer from '../core/counter/counterSlice';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({
  history: createBrowserHistory()
});

export const store = configureStore({
  reducer: {
    router: routerReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware)
});
export const history = createReduxHistory(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
