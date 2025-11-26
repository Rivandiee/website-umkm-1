import { Request, Response } from "express";
import { AnalyticsService } from "../../core/services/analytics.service";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Jalankan semua query secara parallel agar cepat
    const [summary, weeklyRevenue, monthlyOrders, popularMenu] = await Promise.all([
      AnalyticsService.getSummaryStats(),
      AnalyticsService.getWeeklyRevenue(),
      AnalyticsService.getMonthlyOrders(),
      AnalyticsService.getPopularMenu()
    ]);

    return (res as any).success({
      summary,
      charts: {
        revenue: weeklyRevenue,
        orders: monthlyOrders,
        menu: popularMenu
      }
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return (res as any).error("Failed to fetch analytics data");
  }
};