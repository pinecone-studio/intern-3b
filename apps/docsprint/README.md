# DocSprint

DocSprint нь HR ажилтны мэдээлэл бүртгэх, банкны данс хадгалах, гэрээний загвар preview/print/download хийх, audit log харах зориулалттай Next.js + GraphQL + Prisma application.

## Tech stack

- Next.js 16
- React 19
- Nx monorepo
- Apollo GraphQL
- Prisma 7 + PostgreSQL
- Tailwind CSS

## Local run

```bash
yarn install --frozen-lockfile
cp apps/docsprint/.env.example apps/docsprint/.env.local
# DATABASE_URL утгаа apps/docsprint/.env.local файлд тохируулна
cd apps/docsprint && yarn prisma generate && yarn prisma migrate deploy && cd ../..
yarn nx dev docsprint
```

Local URL: `http://localhost:4200`

## Production build

```bash
cd apps/docsprint && yarn prisma generate && cd ../..
yarn nx build docsprint
```

## Health check

Deploy хийсний дараа database холболтоо эндээс шалгана:

```text
/api/health
```

`database: "connected"` гэж гарвал Prisma/PostgreSQL холболт ажиллаж байна.

## Vercel deployment

Repository root дээрээс deploy хийнэ.

Vercel project settings:

- Framework Preset: Next.js
- Install Command: `yarn install --frozen-lockfile`
- Build Command: `cd apps/docsprint && yarn prisma generate && cd ../.. && yarn nx build docsprint`
- Output Directory: `dist/apps/docsprint/.next`

Environment Variables:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXT_PUBLIC_CREATED_BY_ID` — optional. Хоосон байвал default admin автоматаар үүснэ.

Migration-г production database дээр нэг удаа ажиллуулна:

```bash
cd apps/docsprint
yarn prisma migrate deploy
```
