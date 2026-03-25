import mongoose from 'mongoose'
import AvgrecordModel from '../model/StudentAvgrecord.js'
import userModel from '../model/user.js'

export const getAllAvgRecords = async (req, res) => {
  try {
    console.log('Enter')

    const records = await AvgrecordModel.find()

    const result = await Promise.all(
      records.map(async rec => {
        const user = await userModel.findById(rec.userId)

        return {
          userId: rec.userId,
          name: user?.Name || null,
          mobile: user?.mobile || null,
          score: rec.score,
          accuracy: rec.accuracy,
          emotion: rec.emotion,
          VoiceConfindance: rec.VoiceConfindance
        }
      })
    )

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    })
  } catch (error) {
    console.error('Fetch Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllAvgRecordStudent = async (req, res) => {
  console.log('Enter 2')

  try {
    // const records = await userModel.find({
    //   gmail: { $regex: '@sipnaengg\\.ac\\.in$', $options: 'i' }
    // })

    const records = await userModel.find({
<<<<<<< HEAD:Backend/controllers/StudAVGRecord.controller.js
      Batch: 'A2'
=======
      Batch: "A1"
>>>>>>> 84bbeb6ef00270a5a39ad9bd05f8ed0d613a42bd:Backend/controllers/StudAVGRecord.js
    })

    const result = await Promise.all(
      records.map(async rec => {
        const avg = await AvgrecordModel.findOne({
          userId: rec._id
        })

        return {
          userId: rec._id,
          name: rec?.Name ?? null,
          mobile: rec?.mobile ?? null,
          score: avg?.score ?? 0,
          accuracy: avg?.accuracy ?? 0,
          emotion: avg?.emotion ?? 0,
          VoiceConfindance: avg?.VoiceConfindance ?? 0,
          Batch: avg?.Batch ?? null
        }
      })
    )

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    })
  } catch (error) {
    console.error('Fetch Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteBatch = async (req, res) => {
  try {
    const result = await userModel.deleteMany({
      Batch: 'A1'
    })

    res.status(200).json({
      success: true,
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server Error'
    })
  }
}
