"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/data/business";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 h-20 border-b bg-white transition-shadow duration-300 ${
        scrolled ? "border-maroon/10 shadow-[0_4px_16px_rgba(74,18,27,0.06)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative h-14 w-11 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Kwik2Travels Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col font-display">
            <div className="flex items-baseline leading-tight">
              <span className="text-xl font-bold text-maroon">Kwik2</span>
              <span className="text-xl font-bold text-gold">Travels</span>
            </div>
            <span className="text-[10px] font-semibold tracking-wider text-maroon/70 uppercase">
              {business.slogan}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {business.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-text-dark/80 transition-colors hover:text-maroon"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.phoneTel}
            className="flex items-center gap-2 text-sm font-semibold text-maroon"
          >
            <Phone className="size-4" aria-hidden />
            {business.phoneDisplay}
          </a>
          <Button as={Link} href="/booking" size="default">
            BOOK NOW
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-[10px] text-maroon lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-maroon/10 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {business.navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[10px] px-3 py-3 text-base font-medium text-text-dark hover:bg-cream"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={business.phoneTel}
                className="flex items-center gap-2 rounded-[10px] px-3 py-3 text-base font-semibold text-maroon"
              >
                <Phone className="size-4" aria-hidden />
                {business.phoneDisplay}
              </a>
              <Button as={Link} href="/booking" size="lg" className="mt-2" onClick={() => setOpen(false)}>
                BOOK NOW
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
