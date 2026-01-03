import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import Coding from '../animations/Coding.json'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const MidPage = () => {
  const [auth] = useAuth()
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()
  const [history , setHistory ] = useState([])

  useEffect(() => {
    if (!auth.user) {
      navigate('/')
    }
  }, [auth, navigate])

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/topicone/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setTopic(data)
      } catch (error) {
        console.error('Failed to fetch topic:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTopic()
  }, [id])

  const handleClick = () => {
    navigate(`/inter/${id}`)
  }

    useEffect(() => {
     const fetchTopics = async () => {
       try {
         const response = await fetch(`${process.env.REACT_APP_BACKEND}/textRecords/${auth.user._id}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         });
   
         const data = await response.json();
         setHistory(data);
       } catch (error) {
         console.error("Failed to fetch topics:", error);
       }
     };
   
     fetchTopics();
   }, []);
   console.log(history);
   

  return (
    <div style={styles.container}>
      {loading || !topic ? (
        <Loading />
      ) : (
        <>
          <h1 style={styles.heading}>{topic.Headline}</h1>

          <div style={styles.topSection}>
            <div style={styles.leftBox}>
              <h2 style={styles.subHeading}>🚀 Prepare Confidently</h2>
              <p style={styles.text}>{topic.descriptionlong}</p>
            </div>

            <div style={styles.rightBox}>
              <Lottie animationData={Coding} loop={true} />
            </div>
          </div>

          <div style={styles.box}>
            <button onClick={handleClick} style={styles.button}>
              ✨ Click Me to Begin!
            </button>
          </div>

          <div style={styles.historyBox}>
            <h2 style={styles.historyTitle}>
              {topic.emoji} Your Activity History
            </h2>
            <p style={styles.textCenter}>
              History will be shown here as you progress.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  heading: {
    textAlign: 'center',
    fontSize: '36px',
    color: '#2d3436',
    marginBottom: '30px'
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '40px',
    flexWrap: 'wrap'
  },
  leftBox: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#dff9fb',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },
  rightBox: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },
  subHeading: {
    fontSize: '24px',
    color: '#0984e3',
    marginBottom: '10px'
  },
  text: {
    fontSize: '16px',
    color: '#2d3436',
    lineHeight: '1.6',
    marginBottom: '10px'
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
    backgroundColor: '#dfe6e9',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    marginBottom: '40px'
  },
  button: {
    padding: '18px 36px',
    fontSize: '20px',
    backgroundColor: '#6c5ce7',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  historyBox: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  historyTitle: {
    fontSize: '24px',
    color: '#2d3436',
    marginBottom: '20px',
    textAlign: 'center'
  },
  textCenter: {
    textAlign: 'center',
    color: '#636e72',
    fontSize: '16px'
  }
}

export default MidPage
