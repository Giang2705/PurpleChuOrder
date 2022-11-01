import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const QnADetails = () => {
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.userAPI.callback;
  const [inquiries] = state.userAPI.inquiries;
  const [allInquiries, setAllInquiries] = useState([])
  const [inquiryDetail, setInquiryDetail] = useState([]);
  const [btnEdit, setBtnEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const params = useParams();

  const getAllInquiries = async () => {
    const res = await axios.get("/api/inquiries")
    setAllInquiries(res.data)
  }

  const onClick = () => {
    setAnswer(inquiryDetail.answer)
    setIsEdit(true);
  };

  const update = async (e) => {
    e.preventDefault();
    try {
        if(await axios.put(`/api/inquiries/${params.id}`, {
          answer: answer,
          status: "Đã trả lời",
          email: inquiryDetail.email
        })) {
          setCallback(!callback);
          setIsEdit(false);
        };
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  
    getAllInquiries()

  useEffect(() => {
      if(isAdmin) {
        allInquiries.forEach((item) => {
          if(item._id === params.id) setInquiryDetail(item);
        });
      } else {
        inquiries.forEach((item) => {
          if(item._id === params.id) setInquiryDetail(item);
        });
      }
  }, [allInquiries, inquiries])

  useEffect(() => {
    if (params.id) {
      inquiries.forEach((item) => {
        if (item._id === params.id) setInquiryDetail(item);
      });
    }
  }, [params.id, inquiries]);


  if (inquiryDetail.length === 0) return null;

  return (
    <div className="inquiries-page">
        <div className="questionContent">
            <h3>Tên người dùng: {inquiryDetail.name} ({inquiryDetail.email})</h3>
            <h5>Vấn đề: {inquiryDetail.subject}</h5> 
            <h5>Câu hỏi: {inquiryDetail.content}</h5> 
            <h5>Giải đáp: </h5>
            <p>{inquiryDetail.answer == "" ? "Chưa có câu trả lời" : `${inquiryDetail.answer}`}</p>
            {
              isAdmin ? (<div className="btn">
              <button onClick={onClick}>{inquiryDetail.answer === "" ? "Trả lời" : "Chỉnh sửa"}</button>
          </div>) : null
            }
        </div>

        {
            isEdit ? (
                <form action="" className="updatedForm">
                    <label htmlFor="answer">Giải đáp: </label>
                    <textarea name="answer" id="" cols="30" rows="5" value={answer} onChange={(e) => setAnswer(e.target.value)}/>

                    <button type="submit" onClick={update}>Post</button>
                </form>
            ) : null
        }
    </div> 
  );
};

export default QnADetails;
