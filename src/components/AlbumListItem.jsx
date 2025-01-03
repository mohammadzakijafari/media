import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import { MdDeleteOutline } from "react-icons/md";
import Button from './Button';
import { useRemoveAlbumMutation } from '../store/apis/albumsApi';


const AlbumListItem = ({ album }) => {
    // accessing data after deletion of the album
    const [removeAlbum, result] = useRemoveAlbumMutation();

    // handling deleting album
    const handleDeleteAlbum = () => {
        removeAlbum(album);
    }
    const header = <>
            <Button onClick = {handleDeleteAlbum} loading={result.isLoading} className = "mr-2"> <MdDeleteOutline /> </Button>
            { album.title } 
        </>
    return <ExpandablePanel header = {header} >
        List of photos in the album
    </ExpandablePanel>
}

export default AlbumListItem