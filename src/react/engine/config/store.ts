// Core
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
// Engine
import clustersReducer from '../core/clusters/slice';
import { rootSaga } from "./rootSaga";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({
  history: createBrowserHistory()
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    router: routerReducer,
    clusters: clustersReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware, routerMiddleware],
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
