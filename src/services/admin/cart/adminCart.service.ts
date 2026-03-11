import { Cart } from "../../../models/products/productCart.model";

// Lấy tất cả giỏ hàng (có phân trang + tìm kiếm)
export const getAllCarts = async (params: {
  offset?: number;
  limit?: number;
  keyword?: string;
}) => {
  const { offset = 0, limit = 10, keyword } = params;

  // Lấy tất cả carts và populate user + product
  const allCarts = await Cart.find()
    .populate("user_id", "fullName email avatar")
    .populate("items.product_id", "name price discount thumbnail")
    .lean();

  // Lọc theo keyword (email hoặc fullName)
  let filtered = allCarts;
  if (keyword) {
    const kw = keyword.toLowerCase();
    filtered = allCarts.filter((cart: any) => {
      const user = cart.user_id as any;
      if (!user) return false;
      return (
        user.email?.toLowerCase().includes(kw) ||
        user.fullName?.toLowerCase().includes(kw)
      );
    });
  }

  const totalRows = filtered.length;
  const totalPages = Math.ceil(totalRows / limit);
  const safeOffset = offset > totalRows ? 0 : offset;
  const paginated = filtered.slice(safeOffset, safeOffset + limit);

  return { carts: paginated, totalRows, totalPages };
};

// Lấy giỏ hàng của 1 user cụ thể
export const getCartByUserId = async (userId: string) => {
  const cart = await Cart.findOne({ user_id: userId })
    .populate("user_id", "fullName email avatar")
    .populate("items.product_id", "name price discount thumbnail sizes colors")
    .lean();

  if (!cart) {
    return { user_id: userId, items: [] };
  }

  return cart;
};

// Xoá toàn bộ giỏ hàng của 1 user
export const clearCartByUserId = async (userId: string) => {
  const cart = await Cart.findOneAndUpdate(
    { user_id: userId },
    { items: [] },
    { new: true },
  );

  if (!cart) {
    throw new Error("Giỏ hàng không tồn tại!");
  }

  return cart;
};

// Xoá 1 item khỏi giỏ hàng của user
export const removeItemFromCart = async (userId: string, itemId: string) => {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    throw new Error("Giỏ hàng không tồn tại!");
  }

  const initialLength = cart.items.length;
  cart.items.pull({ _id: itemId });

  if (cart.items.length === initialLength) {
    throw new Error("Sản phẩm không tồn tại trong giỏ hàng!");
  }

  await cart.save();

  return await Cart.findById(cart._id)
    .populate("user_id", "fullName email avatar")
    .populate("items.product_id", "name price discount thumbnail sizes colors")
    .lean();
};
