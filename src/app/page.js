import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E0F7FA] text-[#0A192F] px-6">
      <Image src="/next.svg" alt="Next.js Logo" width={150} height={50} priority />

      <h1 className="text-4xl font-bold mt-6">Welcome to My Website</h1>
      <p className="text-lg text-[#1E3A5F] mt-2">Building modern web apps with ease.</p>

      <div className="mt-6 flex gap-4">
        <a
          href="#"
          className="px-6 py-3 bg-[#008080] hover:bg-[#006666] text-white rounded-lg transition"
        >
          Get Started
        </a>
        <a
          href="#"
          className="px-6 py-3 bg-[#FF6F00] hover:bg-[#E65C00] text-white rounded-lg transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
