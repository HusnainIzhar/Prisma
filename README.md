```env
DATABASE_URL="file:./prisma/dev.db"

```bash
npx prisma migrate dev --name init
npx prisma generate
