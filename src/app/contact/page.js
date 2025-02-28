export default function ContactPage() {
  return (
    <div className="container mx-auto p-8 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4 text-teal-600">Contact Us</h1>
      <p className="text-lg leading-relaxed mb-4">
        Have any questions or need assistance? Reach out to us anytime!
      </p>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-lg">
          📧 Email:{" "}
          <a
            href="mailto:support@day3.com"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            support@Business.com
          </a>
        </p>
        <p className="text-lg">📍 Location: 123 Business Street, City, Country</p>
        <p className="text-lg">📞 Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
}
