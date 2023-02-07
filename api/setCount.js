import { get } from "@vercel/edge-config";

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default async function handler(request, response) {
  // const MY_SECRET = process.env.MY_SECRET

  const key = "link4";

  const currentValue = await get(key);
  const newValue = currentValue + 1;

  const url = `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`;

  const result = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "update",
          key: key,
          value: newValue,
        },
      ],
    }),
  });

  const success = result.status === 200;

  response.status(200).json({
    success,
  });
}
