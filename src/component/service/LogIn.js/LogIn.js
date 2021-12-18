import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Div } from '../style/styled-compo'

function LogIn() {
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')

  const handleUserId = (e) => {
    setUserId(e.target.value)
  }

  const handleUserPw = (e) => {
    setUserPw(e.target.value)
  }

  const onClickLogin = () => {
    axios
      .post('/api/login', {
        email: userId,
        password: userPw,
      })
      .then((res) => console.log(res))
      .catch()
    console.log('click login', {
      email: userId,
      password: userPw,
    })
  }

  // useEffect(() => {
  //   axios
  //     .post("/mock/login")
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  return (
    <div>
      <h1 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '26px', height: '35px' }}>Login</h1>
      <Div>
        <div style={{ padding: '20px' }}>
          <label htmlFor="input_id">ID</label>
          <input type="email" placeholder="ooo@oooo" value={userId} onChange={handleUserId} style={{ width: '200px' }} />
        </div>
        <div style={{ padding: '20px' }}>
          <label htmlFor="input_pw">PW</label>
          <input type="password" value={userPw} onChange={handleUserPw} style={{ width: '200px' }} />
        </div>
        <div>
          <button type="button" onClick={onClickLogin} style={{ backgroundColor: '#3B434D', color: '#ffffff' }}>
            Login
          </button>
        </div>
      </Div>
    </div>
  )
}

export default LogIn
