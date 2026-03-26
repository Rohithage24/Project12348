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
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!auth.user) {
      navigate('/', { state: { openLogin: true } })
    }
  }, [auth, navigate])

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/topic/topicone/${id}`)
        const data = await res.json()
        setTopic(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTopic()
  }, [id])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/record/textRecords`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
          }
        )
        const data = await res.json()
        setHistory(data)
      } catch (err) {
        console.error(err)
      }
    }
    if (auth?.user) fetchHistory()
  }, [auth.user])

  const handleClick = () => navigate(`/inter/${id}`)

  if (loading || !topic) return <Loading />

  return (
    <div className='midpage-container'>
      <div className="midpage-header-glow">
        <h1 className='midpage-heading'>{topic.Headline}</h1>
      </div>

      <div className='midpage-topSection glass-card'>
        <div className='midpage-leftBox'>
          <h2 className='midpage-subHeading'><span className="icon-glow">🚀</span> Prepare Confidently</h2>
          <p className='midpage-text'>{topic.descriptionlong}</p>
          <div className='midpage-box'>
            <button className='midpage-button' onClick={handleClick}>
              ✨ Click Me to Begin!
            </button>
          </div>
        </div>
        <div className='midpage-rightBox'>
          <div className="lottie-glow-wrapper">
            <Lottie animationData={Coding} loop={true} />
          </div>
        </div>
      </div>

      <div className='midpage-historyContainer'>
        <div className="history-header-flex">
          <h2 className='midpage-historyTitle'>
            <span className="topic-emoji-glow">{topic.emoji}</span> Recent Activity
          </h2>
          {history.length > 3 && <span className="view-limit-tag">Showing latest 3 sessions</span>}
        </div>

        <div className="history-grid-modern">
          {history && history.length > 0 ? (
            history
              .slice(0, 3)
              .map((record, idx) => (
                <div key={idx} className='history-card-modern'>
                  <div className="card-top-accent"></div>
                  
                  <div className="card-body">
                    <div className="score-section">
                       <div className="score-circle-mini">
                          {/* LOGIC FIX: Rounding the score prevents the text overflow */}
                          <span className="score-val">{record.score ? Math.round(record.score) : '0'}</span>
                          <span className="score-pct">%</span>
                       </div>
                    </div>

                    <div className="info-section">
                      <h4 className="history-topic-name">{record.headline || 'Interview Session'}</h4>
                      <p className="history-timestamp">
                        {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'} • 
                        {record.date ? new Date(record.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </p>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className='history-report-btn'
                      onClick={() => navigate(`/History/${record._id}`)}
                    >
                      Analytics Report <i className="report-arrow">→</i>
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className='empty-history-placeholder'>
              <p>No activity yet. Complete your first interview to see analytics!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MidPage