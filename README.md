# TEST

Starter scaffold for a role-based web app (admin-only user creation).

Roles: OWNER, MANAGER, ADMIN, MEMBER

Tech stack: Next.js (pages router, TypeScript) + TailwindCSS + Prisma (SQLite for dev) + NextAuth (Credentials) + bcryptjs

Quick start
1. Copy .env.example to .env and adjust values
2. Install:
   npm install
3. Generate Prisma client and run migration:
   npx prisma generate
   npx prisma migrate dev --name init
4. Seed initial admin:
   npm run seed
5. Run:
   npm run dev
6. Open http://localhost:3000
   Sign in at /api/auth/signin with seeded admin (admin@local / adminpassword)

Notes
- For production use Postgres: update prisma/schema.prisma datasource provider and DATABASE_URL.
- Replace NEXTAUTH_SECRET with a long random string.