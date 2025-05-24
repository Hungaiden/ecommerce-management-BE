import { Tour } from '../../../models/tours/tour.model' // model tour của bạn
import { getTourRecommendations } from '../../../services/client/tours/gemini.Service'

export const recommendTour = async (req, res) => {
  try {
    const userInput = req.body

    // 1. Lấy toàn bộ tour từ DB (hoặc lọc sơ bộ theo location, budget...)
    const allTours = await Tour.find({ deleted: false })
    
    // 2. Gọi Gemini để lấy tour phù hợp
    const recommendations = await getTourRecommendations(userInput, allTours)

    // 3. Trả về kết quả
    res.json({ recommended: recommendations })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}