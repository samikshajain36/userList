import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from './userSlice';

const Card = ({ post }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log('handleDelete called');
    dispatch(deletePost(post.id));
  };

  return (
    <div className="card grid grid-col-3 border border-gray-500 shadow ">
      <div className='p-6 h-[300px]'>
        <div className='flex'>
          <div className='m-4 p-2'>
            <h2 className='mt-2'>{post.title}</h2>
            <p>{post.body}</p>
          </div>
          <div className=''>
            <button className='text-xl text-red-500' onClick={handleDelete}>X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

