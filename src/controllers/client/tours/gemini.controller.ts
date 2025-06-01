import { Tour } from '../../../models/tours/tour.model' // model tour của bạn
import { getTourRecommendations } from '../../../services/client/tours/gemini.Service'

export const recommendTour = async (req, res) => {
  try {
    const userInput = req.body

    // 1. Lấy toàn bộ tour từ DB (hoặc lọc sơ bộ theo location, budget...)
    const allTours = await Tour.find({ deleted: false })
    
    // 2. Gọi Gemini để lấy tour phù hợp
    const recommendedTourIds = await getTourRecommendations(userInput, allTours)

    if (!Array.isArray(recommendedTourIds) || recommendedTourIds.length === 0) {
      return res.status(200).json({ tours: [] })
    }

    // Truy vấn DB lấy chi tiết tour theo id
    const matchedTours = await Tour.find({ _id: { $in: recommendedTourIds } })
  // 3. Trả về kết quả
    res.status(200).json({ tours: matchedTours })
    
    
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}