import React, {useState, useEffect} from 'react'
import axios from "axios"

const InquiriesAPI = () => {
    const [inquiries, setInquiries] = useState([])
  
    useEffect(() => {
      const getInquiries = async () => {
        const res = await axios.get('/api/inquiries')
        setInquiries(res.data)
      }
      getInquiries()
    },[])
    
  return {
    inquiries: [inquiries, setInquiries],
  }
}

export default InquiriesAPI