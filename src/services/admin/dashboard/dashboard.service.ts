import { ProductBooking } from "../../../models/products/productBooking.model";
import Product from "../../../models/products/product.model";
import { Account } from "../../../models/accounts/account.model";

export const getDashboardSummary = async () => {
  try {
    // Calculate total revenue
    const revenueResult = await ProductBooking.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Get booking statistics
    const bookingStats = await ProductBooking.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const bookingStatsMap = bookingStats.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalBooking = {
      total: bookingStats.reduce((sum, curr) => sum + curr.count, 0),
      pending: bookingStatsMap["pending"] || 0,
      completed: bookingStatsMap["completed"] || 0,
      cancelled: bookingStatsMap["cancelled"] || 0,
    };

    // Get product statistics
    const productStats = await Product.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const productStatsMap = productStats.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalProduct = {
      total: productStats.reduce((sum, curr) => sum + curr.count, 0),
      active: productStatsMap["active"] || 0,
      inactive: productStatsMap["inactive"] || 0,
    };

    // Total accounts
    const totalAccounts = await Account.countDocuments({ deleted: false });

    return {
      totalRevenue,
      totalBooking,
      totalProduct,
      totalAccounts,
    };
  } catch (error) {
    throw new Error("Error getting dashboard summary");
  }
};
