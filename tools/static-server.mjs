import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const port = Number.parseInt(process.argv[2] || "5173", 10);
const host = process.argv[3] || "0.0.0.0";

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml; charset=utf-8"],
]);

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = resolve(join(root, safePath));

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    return null;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    return join(filePath, "index.html");
  }

  return filePath;
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || "/");

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": mimeTypes.get(extname(filePath)) || "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(filePath).pipe(response);
});

function getLanUrls() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((network) => network && network.family === "IPv4" && !network.internal)
    .map((network) => `http://${network.address}:${port}`);
}

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Try another port, for example: node tools/static-server.mjs 5174`);
    process.exit(1);
  }

  throw error;
});

server.listen(port, host, () => {
  console.log(`Static server running locally at http://127.0.0.1:${port}`);
  for (const url of getLanUrls()) {
    console.log(`Phone URL on same Wi-Fi: ${url}`);
  }
});
