import React from 'react'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store'
import Skeleton from './Skeleton';
import { connect } from 'react-redux';
import PhotosListItem from './PhotosListItem';
import Button from './Button';

const PhotosList = ({ album }) => {
    // accessing data from redux store
    const {data, error, isLoading} = useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResult] = useAddPhotoMutation();
    
    // add photo functionality
    const handleAddPhoto = () => {
        addPhoto(album);
    }

    // displaying data fetched from redux store and to display to user
    let content;
    if(isLoading) {
        content = <Skeleton  className='h-8 w-8' times={4}/>
    } else if (error) {
        content = <div className=''> Error Fetching Photos... </div>
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo = { photo } />
        })
    }
  return (
    <div>
        <div className='m-6 flex items-center justify-between'>
            <h3 className='text-lg font-bold'> Photos for Album {album.title} </h3>
            <Button loading={addPhotoResult.isLoading} onClick = { handleAddPhoto }> + Add Photo </Button>
        </div>
    
        <div className='mx-8 flex flex-wrap justify-center'>
            { content }
        </div>
    </div>
  )
}

export default PhotosList