import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-lg">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
