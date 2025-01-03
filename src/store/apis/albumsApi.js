
import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002' }),
    endpoints: (builder) => ({
        removeAlbum: builder.mutation({
            invalidatesTags: (result, error, album) => [{type: 'Album', id: album.id}],
            query: (album) => ({
                url: `albums/${album.id}`,
                method: 'DELETE',
            }),
        }),
        addAlbum: builder.mutation({
            invalidatesTags: (result, error, user) => [{type: 'UsersAlbums', id: user.id}],
            query: (user) => ({
                url: 'albums',
                method: 'POST',
                body: {userId: user.id, title: faker.commerce.productName()},
            }),
        }),
        fetchAlbums: builder.query({
            providesTags: (result, error, user) => {
                if (!result) return [{ type: 'UsersAlbums', id: user.id }];
                const tags = result.map((album) => ({ type: 'Album', id: album.id }));
                tags.push({ type: 'UsersAlbums', id: user.id });
                return tags;
            },
            // providesTags: (result, error, user) => {
            //     const tags = result.map((album) => {
            //         return [{type: 'Album', id: album.id}];
            //     });
            //     tags.push({type: 'UsersAlbums', id: user.id});
            //     return tags;
            // },
            query: (user) => ({
                url: '/albums',
                params: { userId: user.id },
                method: 'GET',
            }),
        }),
    }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;


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