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
  const key = request?.body?.id;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST');

  if (request.method === 'OPTIONS') {
    response.setHeader('Connection', 'keep-alive');

    response.status(200).json();
    return;
  }

  if (typeof key !== 'string') {
    return response.status(400).json({ success: false });
  }

  const planetScaleResponse = await conn.execute(
    `UPDATE counter SET value = value + 1 WHERE id = '${key}'`,
  );

  response
    .status(200)
    .json({ success: planetScaleResponse?.rowsAffected === 1 });
}
