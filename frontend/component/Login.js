import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
     const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    gmail: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      console.log(formData)

      const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
    //   console.log(data);
       if (data && data.user) {
          setAuth({
            ...auth,
            user: data.user,
            token: data.token,
          });
        }
        localStorage.setItem('auth', JSON.stringify(data));
       setMessage(data.message || 'Login successful')
       navigate('/');
     
    } catch (err) {
      console.error(err)
      setMessage(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='gmail'
        className='form-control mb-3'
        placeholder='Email Address'
        value={formData.gmail}
        onChange={handleChange}
        required
      />
      <input
        type='password'
        name='password'
        className='form-control mb-3'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type='submit' className='btn btn-success w-100'>
        Login
      </button>
      {message && (
        <div className='alert alert-info text-center mt-2'>{message}</div>
      )}
    </form>
  )
}

export default Login
