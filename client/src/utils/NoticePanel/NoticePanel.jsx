import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Page from "./Pagination";
import Posts from "./Posts";

const NoticePanel = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [content, setContent] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [callbackProduct, setCallbackProduct] = state.productAPI.callback
  const [callback, setCallback] = state.notiAPI.callback;
  const [posts] = state.notiAPI.noti;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const createNoti = async (e) => {
    e.preventDefault()
    try {
    const res = await axios.post('/api/noti', {content: content})

    alert(res.data)
    setOnEdit(false)
    setContent('')
    setCallback(!callback)
    setCallbackProduct(!callbackProduct)
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  
  return (
    <div className="notice-area">
      <h1>Thông báo</h1>
      <hr />

      <div className="container">
        <Posts posts={currentPosts} loading={loading} />
        <Page
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {isAdmin ? (
        <form action="" onSubmit={createNoti}>
          <label htmlFor="content">Nội dung thông báo</label>
          <textarea name="content" type="text" value={content} onChange={(e) => setContent(e.target.value)} required/>
          <button type="submit">
            Post
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default NoticePanel;
