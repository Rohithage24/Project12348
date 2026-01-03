import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// ✅ Validation schema with Yup
const validationSchema = Yup.object({
  gmail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

const LoginForm = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const [message, setMessage] = React.useState('')

  // ✅ Handle submit with Formik
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const data = await res.json()

      if (data && data.user) {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token
        })
        localStorage.setItem('auth', JSON.stringify(data))
        setMessage(data.message || 'Login successful')
        resetForm()
        navigate('/')
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Login error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      <Formik
        initialValues={{ gmail: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div>
              <Field
                type="email"
                name="gmail"
                style={styles.input}
                placeholder="Email Address"
              />
              <ErrorMessage
                name="gmail"
                component="div"
                style={styles.error}
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                style={styles.input}
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={styles.error}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              Don’t have an account?{' '}
              <span
                onClick={() => navigate('/signup')}
                style={{
                  color: '#3498db',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Sign up
              </span>
            </p>

            {message && (
              <div className="alert alert-info text-center mt-2">
                {message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '0 auto'
  },
  heading: {
    marginBottom: '20px',
    color: '#3498db'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%'
  },
  button: {
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px'
  }
}

export default LoginForm


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthProvider'
// import SignupForm from './SignupForm'

// const LoginForm = () => {
//   const navigate = useNavigate()
//   const [auth, setAuth] = useAuth()

//   const [formData, setFormData] = useState({
//     gmail: '',
//     password: ''
//   })

//   const [message, setMessage] = useState('')

//   const handleChange = e => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()

//     try {
//       const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       })

//       const data = await res.json()

//       if (data && data.user) {
//         setAuth({
//           ...auth,
//           user: data.user,
//           token: data.token
//         })
//         localStorage.setItem('auth', JSON.stringify(data))
//         setMessage(data.message || 'Login successful')
//         navigate('/')
//       } else {
//         setMessage(data.message || 'Login failed')
//       }
//     } catch (err) {
//       console.error(err)
//       setMessage('Login error')
//     }
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Login</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type='email'
//           name='gmail'
//           style={styles.input}
//           placeholder='Email Address'
//           value={formData.gmail}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type='password'
//           name='password'
//           style={styles.input}
//           placeholder='Password'
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type='submit' style={styles.button}>
//           Login
//         </button>
//         <p style={{ fontSize: '14px', marginTop: '10px' }}>
//           Don’t have an account?{' '}
//           <span
//             // onClick={() => navigate('/signup')}
//             style={{
//               color: '#3498db',
//               cursor: 'pointer',
//               textDecoration: 'underline'
//             }}
//           >
//             Sign up
//           </span>
//         </p>

//         {message && (
//           <div className='alert alert-info text-center mt-2'>{message}</div>
//         )}
//       </form>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     padding: '30px',
//     textAlign: 'center',
//     maxWidth: '400px',
//     margin: '0 auto'
//   },
//   heading: {
//     marginBottom: '20px',
//     color: '#3498db'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px'
//   },
//   input: {
//     padding: '12px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     fontSize: '16px'
//   },
//   button: {
//     padding: '12px',
//     backgroundColor: '#3498db',
//     color: 'white',
//     fontSize: '16px',
//     borderRadius: '8px',
//     border: 'none',
//     cursor: 'pointer'
//   }
// }

// export default LoginForm
