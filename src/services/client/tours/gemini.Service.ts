// services/geminiService.js
import axios from 'axios'

// eslint-disable-next-line no-undef
const GEMINI_API_KEY = process.env.API_GEMINI_KEY // <- dán API key ở đây
// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

export async function getTourRecommendations(userInput, tours) {
  const prompt = `
Người dùng muốn đặt tour với yêu cầu như sau:
${JSON.stringify(userInput, null, 2)}

Dưới đây là danh sách các tour có trong hệ thống:
${JSON.stringify(tours, null, 2)}

Hãy tìm những tour phù hợp nhất với yêu cầu của người dùng. Ưu tiên hàng đầu là các tour có điểm đến (destination) giống với yêu cầu. Sau đó, xét thêm các yếu tố như thời gian đi (duration), ngày khởi hành (startDate), hoặc giá cả nếu cần. Trả lại danh sách các tour phù hợp nhất dưới dạng mảng JSON các id. Không giải thích, không dùng markdown.

["id1", "id2", "id3", ...]
Chỉ trả lại mảng JSON các id, không cần giải thích.
`

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    })

    const rawText = response.data.candidates[0]?.content?.parts[0]?.text
    
    // Clean the response text
    const cleanText = rawText
      .replace(/```json\s*/g, '') // Remove ```json
      .replace(/```\s*/g, '') // Remove remaining ```
      .trim() // Remove extra whitespace

    // Parse the cleaned JSON
    const tourIds = JSON.parse(cleanText)
    return tourIds

  } catch (error) {
    console.error('Gemini API error:', error.message)
    console.error('Raw response:', error.response?.data)
    return []
  }
}
