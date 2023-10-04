var items: string[] = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
]


const getItems = (_: Request) => {
  return new Response(JSON.stringify(items))
}

const routes: any =
{
  GET: {
    '/items': getItems
  }
}


const server = Bun.serve({
  port: 3000,
  fetch(request: Request) {
    const { method, url } = request;
    const endpoint = routes[method] && routes[method][url.replace('http://localhost:3000', '')]
    if (endpoint) {
      return endpoint(request)
    }

    return new Response('Not found', { status: 404 });
  },
});


console.log(`Listening on http://localhost:${server.port} ...`);

