import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group'>
      {posts.map(post => (
        <li key={post._id} className='list-group-item'>
          {post.content}
        </li>
      ))}
    </ul>
  );
};

export default Posts;