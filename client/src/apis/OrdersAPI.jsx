import React, {useState, useEffect} from 'react'
import axios from "axios"

const PaymentAPI = () => {
  const [payments, setPayments] = useState([])
  const [callback, setCallback] = useState(false)
  const [method, setMethod] = useState('')
  const [status, setStatus] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(0)
  
    useEffect(() => {
      const getPayment = async () => {
        const res = await axios.get(`/api/payment?${method}&${status}&${sort}&name[regex]=${search}`)
            setPayments(res.data.payments)
            setResult(res.data.result)
      }
      getPayment()
    },[callback, method, sort, search, status])
    
  return {
    payments: [payments, setPayments],
    callback: [callback, setCallback],
    method: [method, setMethod],
    sort: [sort, setSort],
    status: [status, setStatus],
    search: [search, setSearch],
    result: [result, setResult]
  }
}

export default PaymentAPI