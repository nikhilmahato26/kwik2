export const vehicles = [
  {
    slug: "innova-crysta",
    name: "Toyota Innova Crysta",
    description:
      "Comfortable premium travel option for families and longer journeys.",
    image: "/images/innova-crysta.jpg",
  },
  {
    slug: "ertiga",
    name: "Maruti Suzuki Ertiga",
    description: "Spacious and practical option for family and group travel.",
    image: "/images/ertiga.jpg",
  },
  {
    slug: "swift-dzire",
    name: "Maruti Suzuki Swift Dzire",
    description:
      "Comfortable and economical option for everyday and outstation travel.",
    image: "/images/swift-dzire.jpg",
  },
];

export const vehicleOptions = vehicles.map((v) => v.name);
