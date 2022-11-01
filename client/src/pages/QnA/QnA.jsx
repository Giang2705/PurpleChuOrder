import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'

const QnA = () => {
    const state = useContext(GlobalState)
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const [inquiries] = state.userAPI.inquiries 
    const [allInquiries, setAllInquiries] = useState([])

    const getAllInquiries = async () => {
        const res = await axios.get("/api/inquiries")
        setAllInquiries(res.data);
    }
    getAllInquiries()



  return (
    <div className="history-page">
      {isAdmin ? (
        <div>
          <h2>Thắc mắc - Giải đáp</h2>

          <h4>Hiện có {allInquiries.length} thắc mắc</h4>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vấn đề</th>
                  <th>Trạng thái</th>
                  <th>Ngày khởi tạo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allInquiries.map((items) => (
                  <tr key={items._id}>
                    <td>{items._id}</td>
                    <td>{items.subject}</td>
                    <td>{items.status}</td>
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                    <td>{items.status}</td>
                    <td>
                      <Link to={`/qna/${items._id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h2>Thắc mắc - Giải đáp</h2>

          <h4>Hiện có {inquiries.length} thắc mắc</h4>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vấn đề</th>
                  <th>Trạng thái</th>
                  <th>Ngày khởi tạo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((items) => (
                  <tr key={items._id}>
                    <td>{items._id}</td>
                    <td>{items.subject}</td>
                    <td>{items.status}</td>
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/qna/${items._id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default QnA