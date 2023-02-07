import { getAll } from "@vercel/edge-config";

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default async function handler(request, response) {
  // const MY_SECRET = process.env.MY_SECRET

  const data = await getAll();

  const headers = request?.headers;

  /**
   * @type {Intl.DateTimeFormatOptions}
   */
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const date = new Date().toLocaleDateString("sv-SE", options);

  const object = {
    headers,
    date,
    ...data,
  };
  response.status(200).json(object);
}
