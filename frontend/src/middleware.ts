// frontend/src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Ambil path URL saat ini
  const path = request.nextUrl.pathname

  // 2. Cek apakah user mencoba mengakses halaman Admin (kecuali login)
  if (path.startsWith('/admin')) {
    
    // 3. Ambil token dari cookie (Middleware tidak bisa baca LocalStorage)
    const token = request.cookies.get('admin_token')?.value

    // 4. Jika tidak ada token, redirect paksa ke halaman Login
    if (!token) {
      const loginUrl = new URL('/admin-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 5. Lanjutkan request jika aman
  return NextResponse.next()
}

// Konfigurasi agar middleware HANYA berjalan di route /admin/*
export const config = {
  matcher: ['/admin/:path*'],
}