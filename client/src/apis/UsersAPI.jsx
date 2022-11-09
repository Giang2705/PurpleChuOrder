import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UsersAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [version, setVersion] = useState([])
    const [userID, setUserID] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [history, setHistory] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [phone, setPhone] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)
                    setUserID(res.data._id)
                    setEmail(res.data.email)
                    setName(res.data.name)
                    setPhone(res.data.phone)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    useEffect(() => {
        if(token){
            const getHistory = async() => {
                const res = await axios.get("/user/history", {
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }

            const getInquiries = async() => {
                const res = await axios.get("/user/inquiries", {
                    headers: {Authorization: token}
                })
                setInquiries(res.data)
            }
            
            getInquiries()
            getHistory()
        }
    }, [token, callback])

    const addCart = async (product, version) => {
        if(!isLogged) return alert("Đăng nhập để tiếp tục mua hàng")

        if(version.ver === undefined) return alert("Hãy chọn một version để mua hàng")

        const check = cart.every(item => {
            return (item._id !== product._id || item.version !== version)
        })

        if(check) {
            setVersion(version)
            setCart([...cart, {...product, version: version, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, version: version, quantity: 1}]}, {
                headers: {Authorization: token}
            })
        } else {
            alert("Sản phẩm đã được thêm vào giỏ hàng")
        }
    }
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    id: [userID],
    name: [name],
    email: [email],
    history: [history, setHistory],
    inquiries: [inquiries, setInquiries],
    phone: [phone],
    callback: [callback, setCallback],
  }
}

export default UsersAPI