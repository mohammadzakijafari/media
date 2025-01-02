import React from 'react'
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store/apis/albumsApi';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumListItem from './AlbumListItem';

const AlbumsList = ({ user }) => {

    // accessing data from our toolkit query
    const {data, error, isLoading } = useFetchAlbumsQuery(user);
    
    // adding data to toolkit query
    const [addAlbum, result] = useAddAlbumMutation();

    // Creating new Album
    const handleAddAlbum = () => {
        addAlbum(user);
    }

    // content to show to user
    let content;
    if (isLoading) {
        content = <Skeleton className = "h-10 w-full" times = {3} />
    } else if (error) {
        content = <div className=''> Error Loading Albums... </div>
    } else {
        content = data.map((album) => {
            return <AlbumListItem key = {album.id} album = {album} /> 
        })
    }
  return (
    <div>
        <div className='m-6 flex items-center justify-between'>
            <h3 className='text-lg font-bold'> Album for {user.name} </h3>
            <Button loading={result.isLoading} onClick = { handleAddAlbum }> + Add Album </Button>
        </div>
    
        <div className=''>
            { content }
        </div>
    </div>
  )
}

export default AlbumsList