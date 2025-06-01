import { TourBooking } from '../../../models/tours/tourBooking.model'
import { Tour } from '../../../models/tours/tour.model'
import { Account } from '../../../models/accounts/account.model'

export const getDashboardSummary = async () => {
  try {
    // Calculate total revenue
    const revenueResult = await TourBooking.aggregate([
      {
        $match: {
          payment_status: 'paid',
          deleted: false,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total_price' },
        },
      },
    ])
    const totalRevenue = revenueResult[0]?.total || 0

    // Get booking statistics
    const bookingStats = await TourBooking.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const bookingStatsMap = bookingStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count
      return acc
    }, {} as Record<string, number>)

    const totalBooking = {
      total: bookingStats.reduce((sum, curr) => sum + curr.count, 0),
      pending: bookingStatsMap['pending'] || 0,
      // confirmed: bookingStatsMap['confirmed'] || 0,
      completed: bookingStatsMap['completed'] || 0,
      cancelled: bookingStatsMap['cancelled'] || 0,
    }

    // Get tour statistics
    const tourStats = await Tour.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const tourStatsMap = tourStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count
      return acc
    }, {} as Record<string, number>)

    const totalTour = {
      total: tourStats.reduce((sum, curr) => sum + curr.count, 0),
      active: tourStatsMap['active'] || 0,
      inactive: tourStatsMap['inactive'] || 0,
      ended: tourStatsMap['ended'] || 0,
    }

    // Calculate total customers (sum of number_of_people from all paid bookings)
    const totalCustomersResult = await TourBooking.aggregate([
      {
        $match: {
          payment_status: 'paid',
          deleted: false,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$number_of_people' },
        },
      },
    ])
    const totalCustomers = totalCustomersResult[0]?.total || 0

    return {
      totalRevenue,
      totalBooking,
      totalTour,
      totalCustomers,
    }
  } catch (error) {
    throw new Error('Error getting dashboard summary')
  }
}
