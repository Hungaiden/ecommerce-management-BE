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

Hãy chọn ra các tour phù hợp nhất. Trả lại kết quả theo định dạng:
[
  { "id": "Mã tour", "name": "Tên tour" },
  ...
]
Chỉ trả lại JSON, không cần giải thích.
`

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    })

    const rawText = response.data.candidates[0]?.content?.parts[0]?.text
    
    // Clean the response text
    const cleanText = rawText
      .replace(/```json\s*/g, '')  // Remove ```json
      .replace(/```\s*/g, '')      // Remove remaining ```
      .trim()                      // Remove extra whitespace

    // Parse the cleaned JSON
    const result = JSON.parse(cleanText)
    return result

  } catch (error) {
    console.error('Gemini API error:', error.message)
    console.error('Raw response:', error.response?.data)
    return []
  }
}
