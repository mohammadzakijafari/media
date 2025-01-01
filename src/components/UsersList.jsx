import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

const UsersList = () => {

  // using our custom hook that we have created above
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  // initializing state variables for loading and error purposes | this variables are used inside the component not in store
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [loadingUsersError, setLoadingUsersError] = useState(null);
  // const [isCreatingUser, setIsCreatingUser] = useState(false);
  // const [creatingUserError, setCreatingUserError] = useState(null);

  // selector is used to access data from store (redux)
  const {data} = useSelector((state) => {
    return state.users;
  });
  // using use effect for the purpose of loading data while users open our home page
  useEffect(() => {
    // this method is used from custom hook
    doFetchUsers();

    // here we are setting the loading true and then fetchUsers is a promise and we can't make the loading false directly. we have wait for the response and have used the unwrap and catch section
    // setIsLoadingUsers(true);
    // dispatch(fetchUsers())
    //   .unwrap()
    //   .catch((err) => setLoadingUsersError(err))
    //   .finally(() => setIsLoadingUsers(false))

  }, [doFetchUsers]);

  // handling user add
  const handleAddUser = () => {
    // this method is used from custom hook
    doAddUser();
    // here we are setting the loading true and then addUser is a promise and we can't make the loading false directly. we have wait for the response and have used the unwrap and catch section
    // setIsCreatingUser(true);
    // dispatch(addUser())
    //   .unwrap()
    //   .catch((err) => setCreatingUserError(err))
    //   .finally(() => setCreatingUserError())
  }

  let content;
  if (isLoadingUsers) {
    content = <div className=''>
        <Skeleton times={6} className = "h-10 w-full" />
      </div>
  } else if (loadingUsersError) {
    content = <div className=''>
        Data fetching Error...
      </div>
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user = { user } />
      
    });
  }

  return (
    <div className=''>
        <div className='flex items-center justify-between m-5'>
          <h1 className='m-2 text-xl'> Users </h1>
          <Button loading = {isCreatingUser} onClick = {handleAddUser} > + Add User </Button>
          { creatingUserError && 'Error Creating User...'}
        </div>
        {content}
    </div>
  )
}

export default UsersList