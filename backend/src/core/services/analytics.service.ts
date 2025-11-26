import prisma from "../../config/prisma";
import { OrderStatus } from "@prisma/client";

export class AnalyticsService {
  // 1. Ringkasan Atas (Statistik Utama)
  static async getSummaryStats() {
    // Hitung Total Pendapatan (Hanya yang status DONE)
    const revenueAgg = await prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { status: OrderStatus.DONE }
    });

    // Hitung Total Pesanan
    const totalOrders = await prisma.order.count();
    
    // Hitung Pelanggan Unik (Berdasarkan nama)
    // Catatan: Idealnya pakai User ID, tapi karena guest checkout, kita pakai nama
    const uniqueCustomers = await prisma.order.groupBy({
      by: ['customerName'],
      _count: true
    });

    // Hitung Rata-rata Nilai Pesanan
    const avgOrderValue = totalOrders > 0 
      ? (revenueAgg._sum.totalPrice || 0) / totalOrders 
      : 0;

    return {
      totalRevenue: revenueAgg._sum.totalPrice || 0,
      totalOrders,
      totalCustomers: uniqueCustomers.length,
      avgOrderValue: Math.round(avgOrderValue)
    };
  }

  // 2. Grafik Pendapatan Mingguan (7 Hari Terakhir)
  static async getWeeklyRevenue() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        status: OrderStatus.DONE
      },
      select: {
        createdAt: true,
        totalPrice: true
      }
    });

    // Grouping data berdasarkan hari (Sen, Sel, Rab...)
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const revenueMap: Record<string, number> = {};

    // Inisialisasi map agar urut
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        revenueMap[days[d.getDay()]] = 0;
    }

    // Isi data
    orders.forEach(order => {
      const dayName = days[order.createdAt.getDay()];
      if (revenueMap[dayName] !== undefined) {
          revenueMap[dayName] += order.totalPrice;
      }
    });

    return Object.entries(revenueMap).map(([day, pendapatan]) => ({ day, pendapatan }));
  }

  // 3. Grafik Pesanan Bulanan (Tahun Ini)
  static async getMonthlyOrders() {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    
    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: startOfYear } },
      select: { createdAt: true }
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const orderCounts = new Array(12).fill(0);

    orders.forEach(order => {
      orderCounts[order.createdAt.getMonth()]++;
    });

    return months.map((bulan, index) => ({
      bulan,
      pesanan: orderCounts[index]
    }));
  }

  // 4. Menu Terpopuler (Top 5)
  static async getPopularMenu() {
    const topItems = await prisma.orderItem.groupBy({
      by: ['menuId'],
      _sum: { qty: true },
      orderBy: {
        _sum: { qty: 'desc' }
      },
      take: 5
    });

    // Ambil detail nama menu
    const menuDetails = await prisma.menu.findMany({
      where: {
        id: { in: topItems.map(i => i.menuId) }
      }
    });

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    return topItems.map((item, index) => {
      const menu = menuDetails.find(m => m.id === item.menuId);
      return {
        name: menu?.name || 'Unknown',
        value: item._sum.qty || 0,
        color: colors[index % colors.length]
      };
    });
  }
}