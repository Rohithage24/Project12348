// src/pages/History.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const History = () => {
  const { id } = useParams()
  const [test, setTest] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log("test: ",test)
console.log(id);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/record/gettext/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        console.log(data);
        
        setTest(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTopic()
  }, [id])

  if (loading)
    return (
      <div className='history-loading'>
        <Loading />
      </div>
    )
  if (!test) return <div className='history-error'>No data found</div>

  const formattedDate = new Date(test.date).toLocaleString()

  return (
    <div className='history-container'>
      <h1 className='history-headline'>{test.headline} - Test Review</h1>

      <div className='history-metaBox'>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Total Score:</strong> {test.score}
        </p>
      </div>

      <div className='history-questionsWrapper'>
        {test.questions.map((q, index) => (
          <div key={q._id || index} className='history-card'>
            <h3 className='history-questionTitle'>
              Q{index + 1}. {q.questionText}
            </h3>
            <p>
              <strong>Your Answer:</strong>
            </p>
            <p className='history-answerText'>{q.userAnswer}</p>

            <p>
              <strong>Correct Answer:</strong>
            </p>
            <p className='history-correctText'>
              {q.correctAnswer || 'Not provided'}
            </p>

            <div className='history-scoreBox'>
              <span>Score: {q.QuesScore}</span> |
              <span> Accuracy: {q.accuracy}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
