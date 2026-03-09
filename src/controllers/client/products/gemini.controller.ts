import { Request, Response } from "express";
import Product from "../../../models/products/product.model";
import { getProductRecommendations } from "../../../services/client/products/gemini.service";

export const recommendProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userInput = req.body;

    // Lấy toàn bộ sản phẩm từ DB
    const allProducts = await Product.find({ deleted: false });

    // Gọi Gemini để lấy sản phẩm phù hợp
    const recommendedProductIds = await getProductRecommendations(
      userInput,
      allProducts,
    );

    if (
      !Array.isArray(recommendedProductIds) ||
      recommendedProductIds.length === 0
    ) {
      res.status(200).json({ products: [] });
      return;
    }

    // Truy vấn DB lấy chi tiết sản phẩm theo id
    const matchedProducts = await Product.find({
      _id: { $in: recommendedProductIds },
    });

    res.status(200).json({ products: matchedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
