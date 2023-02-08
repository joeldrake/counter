import { getAll } from "@vercel/edge-config";

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
export default async function handler(request, response) {
  const data = await getAll();

  response.setHeader("Access-Control-Allow-Origin", "*");

  if (typeof data.visits === "number") {
    // increment visits by 1
    fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              operation: "update",
              key: "visits",
              value: data.visits + 1,
            },
          ],
        }),
      }
    );
  }

  const return_object = {
    link1: data.link1,
    link2: data.link2,
    link3: data.link3,
    link4: data.link4,
  };

  console.log(return_object);

  response.status(200).json(return_object);
}
