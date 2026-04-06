import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/uploads/mdn-logo.png"
          alt="MDN Logo"
          width={64}
          height={64}
          className="h-16 w-16 object-contain"
          quality={100}
          priority
        />
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded-lg bg-primary-600 text-white font-medium"
          >
            Manajemen Produk
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg hover:bg-dark-700 text-gray-300 transition-colors"
          >
            Lihat Website
          </Link>
        </nav>
        <div className="p-4 border-t border-dark-700">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs font-medium">
              {session?.user?.name?.[0] || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{session?.user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <LogoutButton className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 md:px-12">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          <div className="md:hidden">
            <LogoutButton className="text-sm font-medium text-red-600 hover:text-red-800" />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}