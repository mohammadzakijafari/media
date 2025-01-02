import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import { MdDeleteOutline } from "react-icons/md";
import Button from './Button';


const AlbumListItem = ({ album }) => {
    const header = <div>
            <Button> <MdDeleteOutline /> </Button>
            { album.title } 
        </div>
    return <ExpandablePanel header = {header} >
        List of photos in the album
    </ExpandablePanel>
}

export default AlbumListItem