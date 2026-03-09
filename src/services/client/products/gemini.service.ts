import axios from "axios";

const GEMINI_API_KEY = process.env.API_GEMINI_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function getProductRecommendations(
  userInput: any,
  products: any[],
) {
  const prompt = `
Người dùng muốn tìm sản phẩm với yêu cầu như sau:
${JSON.stringify(userInput, null, 2)}

Dưới đây là danh sách các sản phẩm có trong hệ thống:
${JSON.stringify(products, null, 2)}

Hãy tìm những sản phẩm phù hợp nhất với yêu cầu của người dùng. Ưu tiên hàng đầu là các sản phẩm có tên (name) hoặc danh mục (category) giống với yêu cầu. Sau đó xét thêm các yếu tố như giá cả (price), thương hiệu (brand) nếu cần. Trả lại danh sách các sản phẩm phù hợp nhất dưới dạng mảng JSON các id. Không giải thích, không dùng markdown.
["id1", "id2", "id3", ...]
Chỉ trả lại mảng JSON các id, không cần giải thích.
`;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const rawText = response.data.candidates[0]?.content?.parts[0]?.text;

    const cleanText = rawText
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const productIds = JSON.parse(cleanText);
    return productIds;
  } catch (error: any) {
    console.error("Gemini API error:", error.message);
    console.error("Raw response:", error.response?.data);
    return [];
  }
}
