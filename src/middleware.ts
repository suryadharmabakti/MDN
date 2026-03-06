import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Lewati halaman login — tidak perlu proteksi
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
        return NextResponse.next();
    }

    // Lewati aset statis NextAuth
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Cek token JWT dari cookie session
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName:
            process.env.NODE_ENV === "production"
                ? "__Secure-next-auth.session-token"
                : "next-auth.session-token",
    });

    // Jika tidak ada token yang valid → redirect ke login
    if (!token || !token.email) {
        const loginUrl = new URL("/admin/login", request.url);
        // Tambahkan callbackUrl agar setelah login langsung kembali ke halaman yang dituju
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    // Proteksi semua route /admin dan sub-route-nya
    matcher: ["/admin", "/admin/:path*"],
};
