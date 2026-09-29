import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = async () =>
  new PrismaLibSQL({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

export default defineConfig({
  schema: "prisma/schema.prisma",
  experimental: { adapter: true, studio: true },
  engine: "js",
  adapter,
  studio: { adapter },
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
});
