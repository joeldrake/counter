export default function handler(request, response) {
  const object = {
    secret: process.env.MY_SECRET,
    link1_test: 0,
    link2: 0,
    link3: 0,
    link4: 0,
  };
  response.status(200).json(object);

  //   {
  //     body: request.body,
  //     query: request.query,
  //     cookies: request.cookies,
  //     env: process.env.MY_SECRET,
  //   }
}
