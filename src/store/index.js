import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(albumsApi.middleware);
    }
});

// this section is from Redux toolkit query
setupListeners(store.dispatch);



// this statement explains whatever is exported from the path will be exported from this file as well for the purpose of central export
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';

// export { useFetchAlbumsQuery } from './apis/albumsApi';

// console.log('Exported hooks:', { useFetchAlbumsQuery });
