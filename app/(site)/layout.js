import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getBusinessData } from "@/lib/data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://kwik2travels.example.com"),
  title: {
    default: "Kwik2Travels | Cab Rental & Outstation Taxi Service",
    template: "%s | Kwik2Travels",
  },
  description:
    "Seamless booking for Holidays, Flights, Hotels, Bus, Cabs & Visa — tailored itinerary for your comfort and peace of mind.",
  keywords: [
    "Kwik2Travels",
    "cab service",
    "cab rental",
    "outstation cab",
    "airport taxi",
    "one way cab",
    "round trip cab",
    "Innova Crysta rental",
    "Ertiga rental",
    "Swift Dzire rental",
  ],
  openGraph: {
    title: "Kwik2Travels | Cab Rental & Outstation Taxi Service",
    description:
      "Seamless booking for Holidays, Flights, Hotels, Bus, Cabs & Visa — tailored itinerary for your comfort and peace of mind.",
    siteName: "Kwik2Travels",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SiteLayout({ children }) {
  const business = await getBusinessData();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    telephone: business.phoneDisplay,
    image: "https://kwik2travels.example.com/og-image.jpg",
    priceRange: "Contact for Price",
    areaServed: "IN",
    makesOffer: business.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-off-white text-text-dark">
        <Navbar business={business} />
        <main className="flex-1">{children}</main>
        <Footer business={business} />
        <FloatingActions business={business} />
      </body>
    </html>
  );
}
