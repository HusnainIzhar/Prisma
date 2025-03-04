DATABASE_URL="file:./prisma/dev.db"

npx prisma migrate dev --name init  
npx prisma generate
