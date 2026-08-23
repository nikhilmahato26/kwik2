import { Phone, MessageCircle } from "lucide-react";

export default function FloatingActions({ business }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={business.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-maroon text-white shadow-[0_8px_24px_rgba(74,18,27,0.35)] transition-transform active:scale-95"
      >
        <MessageCircle className="size-6" aria-hidden />
      </a>
      <a
        href={business.phoneTel}
        aria-label="Call Kwik2Travels"
        className="flex size-13 items-center justify-center rounded-full bg-gold text-maroon-deep shadow-[0_8px_24px_rgba(200,155,60,0.4)] transition-transform active:scale-95"
      >
        <Phone className="size-6" aria-hidden />
      </a>
    </div>
  );
}
