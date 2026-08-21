// image: null until real fleet photography is supplied. VehicleCard renders
// a branded placeholder rather than a stock photo of the wrong car model.
export const vehicles = [
  {
    slug: "innova-crysta",
    name: "Toyota Innova Crysta",
    description:
      "Comfortable premium travel option for families and longer journeys.",
    image: null,
  },
  {
    slug: "ertiga",
    name: "Maruti Suzuki Ertiga",
    description: "Spacious and practical option for family and group travel.",
    image: null,
  },
  {
    slug: "swift-dzire",
    name: "Maruti Suzuki Swift Dzire",
    description:
      "Comfortable and economical option for everyday and outstation travel.",
    image: null,
  },
];

export const vehicleOptions = vehicles.map((v) => v.name);
