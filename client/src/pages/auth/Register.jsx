import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    name: '', email: '', password: '', phone: '', address: '' 
  })

  const onChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const registerSubmit = async e => {
    e.preventDefault()
    try {
      if (axios.post('/user/register', {...user})){

        localStorage.setItem('firstLogin', true)

      
        alert('Đăng ký tài khoản thành công!')
  
        window.location.href = "/products";
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className='login-page'>
      <form action="" onSubmit={registerSubmit}>
        <h2>Đăng ký</h2>
        <input type="text" name='name' required placeholder='Họ và Tên' value={user.name} onChange={onChangeInput}/>

        <input type="email" name='email' required placeholder='Email' value={user.email} onChange={onChangeInput}/>

        <input type="password" name='password' required placeholder='Mật khẩu' value={user.password} onChange={onChangeInput}/>

        <input type="number" name='phone' required placeholder='Số điện thoại' value={user.phone} onChange={onChangeInput}/>

        <input type="text" name='address' required placeholder='Địa chỉ' value={user.address} onChange={onChangeInput}/>

        <div className="row">
          <button type='submit'>Đăng ký</button>
          <Link to='/login'>Đăng nhập</Link>
        </div>
      </form>
    </div>
  )
}

export default Register