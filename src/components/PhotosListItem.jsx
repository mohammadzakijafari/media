import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { useRemovePhotoMutation } from '../store';

const PhotosListItem = ({ photo }) => {

    // fetching remove function from redux store
    const [removePhoto, result] = useRemovePhotoMutation();

    // handling photo remove while clicking on photo
    const handleRemovePhoto = () => {
        removePhoto(photo);
    }
    {console.log(photo.url)}
  return (
    <div onClick={handleRemovePhoto} className='relative cursor-pointer m-2'>
      
        <img src={photo.url} className='h-36 w-36' alt='random pic' />
        <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
            <MdDeleteOutline className = 'text-4xl' />
        </div>
    </div>
  )
}

export default PhotosListItem