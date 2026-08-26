import { db } from './lib/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const pkgs = await db.holidayPackage.findMany();
  console.log(JSON.stringify(pkgs, null, 2));
}

main().catch(console.error).finally(() => db.$disconnect());
