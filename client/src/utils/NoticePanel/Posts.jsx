import React from 'react';
import { HiSpeakerphone } from 'react-icons/hi'

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group'>
      {posts.map(post => (
        <li key={post._id} className='list-group-item'><HiSpeakerphone className='icon' /><span>{post.content}</span>
        </li>
      ))}
    </ul>
  );
};

export default Posts;