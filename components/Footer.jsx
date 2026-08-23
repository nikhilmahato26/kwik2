import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

const serviceLinks = [
  "Airport Transfers",
  "One Way",
  "Round Trip",
  "Local Travel",
  "Outstation Travel",
  "Tour Packages",
];

export default function Footer({ business }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maroon-deep px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/logo.png"
                alt="Kwik2Travels Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-white leading-none">
                KWIK2TRAVELS
              </p>
              <p className="mt-1 text-xs text-gold-light font-medium">{business.slogan}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Comfortable and reliable cab services for local, outstation and airport travel.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Quick Links
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {business.navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Our Services
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {serviceLinks.map((label) => (
              <li key={label} className="text-sm text-white/70">
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Contact
          </p>
          <a
            href={business.phoneTel}
            className="mt-4 flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <Phone className="size-4" aria-hidden />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6">
        <p className="text-xs text-white/45">
          © {year} Kwik2Travels. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
