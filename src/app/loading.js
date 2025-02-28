export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  }
  