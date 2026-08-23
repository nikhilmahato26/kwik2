import Link from "next/link";
import "./globals.css";

// This app has two independent root layouts — app/(site)/layout.js and
// app/admin/layout.js — so there is no shared layout.js at the true app
// root. That means this top-level not-found.js (used only when a URL
// matches neither tree) must define its own <html>/<body>.
export const metadata = {
  title: "Kwik2Travels",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-off-white text-text-dark">
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-6xl font-bold text-maroon">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-maroon-deep">
            Page not found
          </h1>
          <p className="mt-2 max-w-sm text-text-dark/70">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-maroon-deep px-6 py-3 text-sm font-bold text-white hover:bg-maroon transition-colors"
          >
            BACK TO HOME
          </Link>
        </section>
      </body>
    </html>
  );
}
