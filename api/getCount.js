export default function handler(request, response) {
  const object = {
    asd: process.env.MY_SECRET,
    link1: 1,
    link2: 2,
    link3: 3,
    link4: 4,
  };
  response.status(200).json(object);

  //   {
  //     body: request.body,
  //     query: request.query,
  //     cookies: request.cookies,
  //     env: process.env.MY_SECRET,
  //   }
}
