import React from 'react'
import Button from './Button'
import { useThunk } from '../hooks/use-thunk'
import { removeUser } from '../store';
import { TiDelete } from "react-icons/ti";

const UsersListItem = ({ user }) => {
    // accessing state function and thunk function
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    // handling delete action
    const handleDeleteClick = () => {
        doRemoveUser(user);
    }

  return (
    <div className='mb-2 border rounded'>
        <div className='flex items center justify-between p-2 cursor-pointer text-xl'> 
            <div className='flex items-center justify-between gap-4'>
                <Button loading={isLoading} onClick = { handleDeleteClick }>
                    <TiDelete />
                </Button>
                {error && <div className=''> Error Deleting User </div>}
                { user.name }     
            </div> 
        </div>
    </div>
  )
}

export default UsersListItem