import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UsersAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [userID, setUserID] = useState();
    const [history, setHistory] = useState([]);
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
            
            getHistory()
        }
    }, [token, callback])

    const addCart = async (product) => {
        if(!isLogged) return alert("Đăng nhập để tiếp tục mua hàng")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check) {
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
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
    history: [history, setHistory],
    callback: [callback, setCallback],
  }
}

export default UsersAPI