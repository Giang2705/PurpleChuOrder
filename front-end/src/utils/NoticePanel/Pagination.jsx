import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


const Page = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  let active = currentPage
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(
      <li onClick={() => paginate(i)} key={i} >
        <Pagination.Item active={i === active}>
      {i}
        </Pagination.Item>
      </li>
    );
  }

  return (
    // <nav>
    //   <ul className='pagination' active={currentPage}>
    //     {pageNumbers.map(number => (
    //       <li onClick={() => paginate(number)} key={number} className='page-item'>
    //         <a className='page-link' active={number === currentPage}>
    //           {number}
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
    <div>
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};

export default Page;