import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
    }
});

export { usersReducer };

// this statement explains whatever is exported from the path will be exported from this file as well for the purpose of central export
export * from './thunks/fetchUsers';