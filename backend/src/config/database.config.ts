import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  postgres: {
    type: process.env.TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    enableSSL: process.env.ENABLE_SQL_SSL ? process.env.ENABLE_SQL_SSL : false,
  },
}));
