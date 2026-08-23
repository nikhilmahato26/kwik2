import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { business } from '../data/business.js';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kwik2travels.com' },
    update: {},
    create: {
      email: 'admin@kwik2travels.com',
      password: hashedPassword,
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // Seed Site Settings
  const settingsToSeed = [
    { key: 'name', value: business.name },
    { key: 'tagline', value: business.tagline },
    { key: 'slogan', value: business.slogan },
    { key: 'logo', value: business.logo },
    { key: 'phoneDisplay', value: business.phoneDisplay },
    { key: 'phoneTel', value: business.phoneTel },
    { key: 'whatsapp', value: business.whatsapp },
  ]

  for (const setting of settingsToSeed) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    })
  }
  console.log('Seeded site settings')

  // Seed Services
  for (const service of business.services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        name: service.name,
        description: service.description,
        icon: service.icon,
        image: service.image,
      },
    })
  }
  console.log('Seeded services')

  // Seed Why Choose Us (Features)
  await prisma.feature.deleteMany()
  for (const feature of business.whyChooseUs) {
    await prisma.feature.create({
      data: {
        title: feature.title,
        icon: feature.icon,
      },
    })
  }
  console.log('Seeded features')

  // Seed Trip Types
  for (const typeName of business.tripTypes) {
    await prisma.tripType.upsert({
      where: { name: typeName },
      update: {},
      create: { name: typeName },
    })
  }
  console.log('Seeded trip types')

  // Seed Vehicles
  const { vehicles } = await import('../data/vehicles.js');
  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: vehicle.slug },
      update: {},
      create: {
        slug: vehicle.slug,
        name: vehicle.name,
        description: vehicle.description,
        image: vehicle.image,
      },
    })
  }
  console.log('Seeded vehicles')

  // Seed Holiday Collections
  const { holidayCollections, holidayPackages } = await import('../data/holidays.js');
  for (const collection of holidayCollections) {
    await prisma.holidayCollection.upsert({
      where: { slug: collection.slug },
      update: {},
      create: {
        slug: collection.slug,
        title: collection.title,
        image: collection.image,
      },
    })
  }
  console.log('Seeded holiday collections')

  // Seed Holiday Packages
  for (const pkg of holidayPackages) {
    await prisma.holidayPackage.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: {
        slug: pkg.slug,
        title: pkg.title,
        originCity: pkg.originCity,
        placesCovered: pkg.placesCovered,
        validity: pkg.validity,
        duration: pkg.duration,
        category: pkg.category,
        hotels: pkg.hotels,
        startingPrice: pkg.startingPrice,
        image: pkg.image,
        pricing: pkg.pricing,
        itinerary: pkg.itinerary,
        inclusions: pkg.inclusions,
        exclusions: pkg.exclusions,
        terms: pkg.terms,
      },
    })
  }
  console.log('Seeded holiday packages')

  // Seed Hotels
  const { hotels } = await import('../data/hotels.js');
  for (const hotel of hotels) {
    await prisma.hotel.upsert({
      where: { slug: hotel.slug },
      update: {},
      create: {
        slug: hotel.slug,
        title: hotel.title,
        location: hotel.location,
        starRating: hotel.starRating,
        startingPrice: hotel.startingPrice,
        image: hotel.image,
        description: hotel.description,
        amenities: hotel.amenities,
        terms: hotel.terms,
      },
    })
  }
  console.log('Seeded hotels')

  console.log('Database seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
