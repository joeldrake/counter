import 'dotenv/config';
import { connect } from '@planetscale/database';

// DB connection
const deets = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(deets);

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');

  const planetScaleResponse = await conn.execute(
    `SELECT * FROM counter WHERE id LIKE 'pdf%'`,
  );

  let return_object = {};

  for (const row of planetScaleResponse?.rows ?? []) {
    return_object[row.id] = row.value;
  }

  response.status(200).json(return_object);
}
