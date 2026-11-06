export default function MainLoading() {
  return (
    <main className="apple-v2 min-h-screen bg-white px-4 py-16 sm:px-6 lg:py-24" aria-busy="true" aria-label="Memuat halaman">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mx-auto h-4 w-24 rounded-full bg-gray-200" />
        <div className="mx-auto mt-5 h-12 max-w-2xl rounded-2xl bg-gray-200" />
        <div className="mx-auto mt-4 h-5 max-w-xl rounded-full bg-gray-100" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-64 rounded-3xl border border-gray-100 bg-gray-50" />)}
        </div>
      </div>
    </main>
  );
}
