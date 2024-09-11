import pg from 'pg'
import {drizzle} from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { env } from '$env/dynamic/private';

const client = new pg.Client({
    user: env.DB_USER,          // Your PostgreSQL username
    host: env.DB_HOST,         // Your PostgreSQL host
    database: env.DB_NAME,      // Your PostgreSQL database name
    password: env.DB_PASS,    // Your PostgreSQL password
    port: env.DB_PORT,
    ssl: {
      rejectUnauthorized: false, // Disable SSL verification for self-signed certificates
    }               // Your PostgreSQL port (default is 5432)
  });

client.connect()

export const db = drizzle(client, {schema: schema})