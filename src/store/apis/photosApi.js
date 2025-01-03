import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photosApi = createApi({
    reducerPath: 'Photos',
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
            invalidatesTags: (result, error, photo) => [{type: 'AlbumPhoto', id: album.id}],
            query: (photo) => ({
                url: '/photos',
                method: 'POST',
                body: {PhotoId: photo.id, url: faker.image.abstract(150, 150, true)},
            })
        }),
        fetchPhotos: builder.query({
            providesTags: (result, error, album) => {
                if (!result) return [{ type: 'AlbumPhoto', id: album.id }];
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