// Fills each indexable route's built HTML with its server-rendered markup, so
// crawlers and no-JS visitors get the content before React hydrates it.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "node_modules/.prerender");

const { ROUTES, render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

const EMPTY_ROOT = '<div id="root"></div>';
// Reveal sections start transparent and fade in from JS; without JS they must show.
const NOSCRIPT_STYLE = "<noscript><style>.reveal{opacity:1;transform:none}</style></noscript>";

for (const route of ROUTES) {
  const file = resolve(dist, `.${route}`, "index.html");
  const html = await readFile(file, "utf8");
  if (!html.includes(EMPTY_ROOT)) throw new Error(`${file}: expected an empty #root`);

  const markup = render(route);
  // Every asset the markup points at must exist in the client build.
  for (const [, asset] of markup.matchAll(/"(\/assets\/[^"?#\s]+)/g)) {
    if (!existsSync(resolve(dist, `.${asset}`))) throw new Error(`${route}: missing ${asset}`);
  }

  const output = html
    .replace("</head>", () => `  ${NOSCRIPT_STYLE}\n  </head>`)
    .replace(EMPTY_ROOT, () => `<div id="root">${markup}</div>`);
  await writeFile(file, output);
  console.log(`prerendered ${route.padEnd(32)} ${(output.length / 1024).toFixed(1)} kB`);
}

await rm(ssrDir, { recursive: true, force: true });
