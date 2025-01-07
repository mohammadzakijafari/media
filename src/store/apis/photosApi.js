import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


function generateRandomImageUrl(width, height) {
    return `https://picsum.photos/${width}/${height}`;
}

function firstRandom () {
    return Math.floor(Math.random() * 100);
}
function secondRandom () {
    return Math.floor(Math.random() * 200);
}
const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002'}),
    endpoints: (builder) => ({
        removePhoto: builder.mutation({
            invalidatesTags: (result, error, photo) => [{type: 'Photo', id: photo.id}],
            query: (photo) => ({
                url: `/photos/${photo.id}`,
                method: 'DELETE',
            })
        }),
        addPhoto: builder.mutation({
            invalidatesTags: (result, error, album) => [{type: 'AlbumPhoto', id: album.id}],
            query: (album) => ({
                url: '/photos',
                method: 'POST',
                body: {albumId: album.id, url: generateRandomImageUrl(firstRandom(), secondRandom())},
            })
        }),
        fetchPhotos: builder.query({
            providesTags: (result, error, album) => {
                const tags = result.map((photo) => ({ type: 'Photo', id: photo.id }));
                tags.push({ type: 'AlbumPhoto', id: album.id });
                return tags;
            },
            query: (album) => ({
                url: '/photos',
                method: 'GET',
                params: {albumId: album.id},
            }),
        }),
    }),
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };