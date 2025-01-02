
import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002' }),
    endpoints: (builder) => ({
        addAlbum: builder.mutation({
            invalidatesTags: (result, error, user) => {
                return [{type: 'Album', id: user.id}];
            },
            query: (user) => ({
                url: 'albums',
                method: 'POST',
                body: {userId: user.id, title: faker.commerce.productName()},
            }),
        }),
        fetchAlbums: builder.query({
            providesTag: (result, error, user) => {
                return [{type: 'Album', id: user.id}];
            },
            query: (user) => ({
                url: '/albums',
                params: { userId: user.id },
                method: 'GET',
            }),
        }),
    }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// const albumsApi = createApi({
//     reducerPath: 'albums',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:3002',
//     }),
//     endpoints(builder) {
//         return {
//             fetchAlbums: builder.query({
//                 query: (user) => {
//                     return {
//                         url: '/albums',
//                         params: {
//                             userId: user.id,
//                         },
//                         method: 'GET',
//                     }; 
//                 },
//             }),
//         };
//     },
// });

// export const { useFetchAlbumsQuery } = albumsApi;
// export { albumsApi };