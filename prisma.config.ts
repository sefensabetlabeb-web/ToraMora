import {config as loadEnv} from 'dotenv';

for (const path of ['.env.production.local', '.env.local', '.env.production', '.env']) {
  loadEnv({path});
}
import {defineConfig} from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {path: 'prisma/migrations', seed: 'tsx prisma/seed.ts'},
  datasource: {url: process.env.DATABASE_URL ?? ''}
});
