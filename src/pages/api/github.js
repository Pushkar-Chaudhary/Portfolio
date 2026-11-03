import githubHandler from "../../lib/server/github.js";

export async function GET({ request }) {
  let statusCode = 200;
  let body;
  const headers = new Headers();

  const response = {
    status(code) {
      statusCode = code;
      return this;
    },
    setHeader(name, value) {
      headers.set(name, value);
      return this;
    },
    json(data) {
      body = data;
    },
  };

  await githubHandler(request, response);

  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(body), { status: statusCode, headers });
}
