import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import usersReducer from "../features/users/usersSlice";
import usersSaga from "../features/users/usersSaga";


const saga = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [saga]
});

saga.run(usersSaga)
