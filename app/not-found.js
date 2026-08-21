import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-bold text-maroon">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-maroon-deep">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-text-dark/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button as={Link} href="/" className="mt-8">
        BACK TO HOME
      </Button>
    </section>
  );
}
