/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default function handler(request, response) {
  // const MY_SECRET = process.env.MY_SECRET

  response.status(200).json({ success: true });
}
