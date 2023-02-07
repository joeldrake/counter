/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default function handler(request, response) {
  // const MY_SECRET = process.env.MY_SECRET

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
    link1: 1,
    link2: 2,
    link3: 3,
    link4: 4,
  };
  response.status(200).json(object);
}
