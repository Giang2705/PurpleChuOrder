import axios from 'axios'
import React, { useState, useEffect } from 'react'

const NotificationsAPI = () => {
    const [noti, setNoti] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getNoti = async () => {
            const res = await axios.get('/api/noti')
            setNoti(res.data)
        }

        getNoti()
    }, [callback])
  return {
    noti: [noti, setNoti],
    callback: [callback, setCallback]
  }
}

export default NotificationsAPI