import React from 'react'
import Button from './Button'
import { useThunk } from '../hooks/use-thunk'
import { removeUser } from '../store';
import { TiDelete } from "react-icons/ti";
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

const UsersListItem = ({ user }) => {
    // accessing state function and thunk function
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    // handling delete action
    const handleDeleteClick = () => {
        doRemoveUser(user);
    }

    const header = <>
        <Button loading={isLoading} onClick = { handleDeleteClick }>
            <TiDelete />
        </Button>
        {error && <div className=''> Error Deleting User </div>}
        { user.name }
    </>
  return (
    <ExpandablePanel header = { header }>
        <AlbumsList user = {user} />
    </ExpandablePanel>
  )
}

export default UsersListItem