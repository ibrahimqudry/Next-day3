import '@/app/globals.css';
export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
