import TestRecord from '../model/TestQuestion.js'
import dotenv from 'dotenv'

dotenv.config()

const testSessions = {}

/**
 * Handle Question & Answer
 */

export const QueAns = async (req, res) => {
  const {
    userId,
    question,
    answer,
    confidenceScore,
    allConfindance,
    key_concepts,
    keywords,
    correctAnswer
  } = req.body

  // console.log(allConfindance);

  if (!userId || !question || !answer) {
    return res.status(400).json({
      message: 'Missing required fields'
    })
  }

  try {
    // 1️⃣ Prepare payload for AI model
    const modelPayload = {
      user_id: String(userId),
      question: question,
      key_concepts: key_concepts || [],
      keywords: keywords || [],
      user_answer: answer
    }

    // console.log("MOdel  ", modelPayload);

    // 2️⃣ Send to FastAPI AI service
    const response = await fetch(
      // 'http://localhost:8002/evaluate-answer',
      `${process.env.ANSWER_CHECK_API}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelPayload)
      }
    )

    if (!response.ok) {
      const err = await response.text()
      return res.status(500).json({
        message: 'AI model error',
        error: err
      })
    }

    const aiResult = await response.json()
    // console.log(aiResult);

    // 3️⃣ Store session data
    if (!testSessions[userId]) {
      testSessions[userId] = []
    }

    testSessions[userId].push({
      questionText: question,
      correctAnswer: correctAnswer || 'Not provided',
      userAnswer: answer,
      QuesScore: Number(aiResult.score_percentage) || 0,
      accuracy: Number(aiResult.keyword_match_score) || 0,
      evaluation: aiResult.evaluation || '',
      ConfidenceScore: Number(confidenceScore) || 0,
      AllConfindance: allConfindance || {}
    })
    // console.log(testSessions);

    // 4️⃣ Send response to frontend
    return res.status(200).json({
      success: true,
      aiResult,
      totalQuestionsAnswered: testSessions[userId].length
    })
  } catch (error) {
    console.error('Backend Error:', error)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

/**
 * Save Test Record
 */

const record = async (req, res) => {
  const { userId, headline, dataEmo } = req.body
  console.log('EMOTION:', dataEmo)

  if (!userId || !headline) {
    return res.status(400).json({ message: 'Missing userId or headline' })
  }

  try {
    const sessionQuestions = testSessions[userId]

    if (!sessionQuestions || sessionQuestions.length === 0) {
      return res
        .status(400)
        .json({ message: 'No questions found for this user' })
    }

    let totalScore = 0
    let totalAccuracy = 0

    sessionQuestions.forEach(q => {
      totalScore += Number(q.QuesScore) || 0
      totalAccuracy += Number(q.accuracy) || 0
    })

    const len = sessionQuestions.length
    const avgScore = len ? totalScore / len : 0
    const avgAccuracy = len ? totalAccuracy / len : 0

    // ✅ Extract emotion value (66.24)
    const emotionScore = dataEmo?.average || 0

    const testRec = await TestRecord.create({
      userId,
      headline,
      questions: sessionQuestions,
      accuracy: avgAccuracy,
      score: avgScore,
      emotion: emotionScore,
      date: new Date()
    })

    delete testSessions[userId]

    return res.status(201).json({
      message: 'Test completed successfully',
      test: testRec
    })
  } catch (err) {
    console.error('Record Save Error:', err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Get all tests for a user
 */
const getUserTest = async (req, res) => {
  const userId = req.params.id

  try {
    const tests = await TestRecord.find({ userId }).sort({ date: -1 })
    console.log(tests);
    
    return res.status(200).json(tests)
  } catch (err) {
    console.error('Get User Tests Error:', err)
    return res.status(500).json({ message: 'Failed to fetch tests' })
  }
}

/**
 * Get single test by testId
 */
const getTest = async (req, res) => {
  const testId = req.params.id
  console.log(testId)

  try {
    const test = await TestRecord.findById(testId)

    if (!test) {
      return res.status(404).json({ message: 'Test not found' })
    }

    return res.status(200).json(test)
  } catch (err) {
    console.error('Get Test Error:', err)
    return res.status(500).json({ message: 'Failed to fetch test' })
  }
}

const allTextDataUser = async (req, res) => {
  const userId = req.params.id
  try {
    const data = await TestRecord.findAll({
      where: { userId: userId }
    })

    if (!date) {
      return res.status(404).json({ message: 'Test not found' })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Get Test Error:', err)
    return res.status(500).json({ message: 'Failed to fetch test' })
  }
}

export default {
  QueAns,
  record,
  getUserTest,
  getTest,
  allTextDataUser
}
