import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store';
import Skeleton from './Skeleton';

const UsersList = () => {
  // initializing use dispatch 
  const dispatch = useDispatch();

  // selector is used to access data from store (redux)
  const {data, isLoading, error} = useSelector((state) => {
    return state.users;
  });
  // using use effect for the purpose of loading data while users open our home page
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return (
      <div className=''>
        <Skeleton times={6} className = "h-10 w-full" />
      </div>
    )
  }
  if (error) {
    return (
      <div className=''>
        Data fetching Error...
      </div>
    )
  }
  return (
    <div className=''>
        {data.length}
    </div>
  )
}

export default UsersList