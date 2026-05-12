import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Seed Users
  const users = [
    {
      name: 'Alex University',
      email: 'alex@uv.es',
      university: 'UV',
      verified: true,
      verificationBadge: 'student',
      budget: 400,
      lookingFor: 'room',
      smoker: false,
      hasPets: false,
      sleepSchedule: 'early',
      studyHabits: 'quiet',
      cleanlinessLevel: 4,
      languages: ['Spanish', 'English'],
      interests: ['Coding', 'Sustainability', 'Hiking'],
      ecoScore: 85,
      role: 'student',
    },
    {
      name: 'Maria Landlord',
      email: 'maria@landlord.com',
      verified: true,
      verificationBadge: 'landlord',
      role: 'landlord',
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  const landlord = await prisma.user.findFirst({ where: { role: 'landlord' } })
  if (!landlord) {
    throw new Error('No landlord user found for seeding listings')
  }

  // Seed Listings
  const listings = [
    {
      title: 'Modern room in Ruzafa',
      description: 'Amazing room with great light in the heart of Ruzafa.',
      type: 'room',
      price: 450,
      size: 12,
      address: 'Calle A, Valencia',
      neighborhood: 'Ruzafa',
      lat: 39.4625,
      lng: -0.3773,
      images: ['https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d'],
      amenities: ['WiFi', 'AC', 'Washing Machine'],
      rules: ['No smoking', 'No pets'],
      availableFrom: new Date(),
      ownerId: landlord.id,
    },
  ]

  for (const listing of listings) {
    await prisma.listing.create({
      data: listing,
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
