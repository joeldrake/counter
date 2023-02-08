import { get } from "@vercel/edge-config";

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default async function handler(request, response) {
  const key = request?.body?.id;

  if (typeof key !== "string") {
    return response.status(400).json({ success: false });
  }

  let currentValue = await get(key);

  if (typeof currentValue !== "number") {
    // only allow existing keys with a number
    return response.status(400).json({ success: false });
  }

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
          value: currentValue + 1,
        },
      ],
    }),
  });

  response.status(200).json({ success: result.status === 200 });
}
