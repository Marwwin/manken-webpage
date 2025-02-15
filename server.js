import { createCalendar } from "./calendar";

const serverDef = async () => ({
  static: {
    "/": new Response(await Bun.file("./index.html").bytes(), {
      headers: { "Content-Type": "text/html" },
    }),
    "/main.css": new Response(await Bun.file("./main.css").bytes(), {
      headers: { "Content-Type": "text/css" },
    }),
    "/assets/manken_logo.jpg": await serveAsset("manken_logo.jpg"),
    "/assets/manken_logo.png": await serveAsset("manken_logo.png"),
    "/assets/sali.jpg": await serveAsset("sali.jpg"),
    "/assets/main_background.jpg": await serveAsset("main_background.jpg"),
  },
  fetch(req) {
    console.log(req.method, req.url);
    const url = new URL(req.url);
    if (url.pathname === "/calendar") {
      const date = url.searchParams.get("date");
      if (date === "now") {
        return new Response(createCalendar(new Date()), {
          headers: { "Content-Type": "text/html" },
        })
      }
      else {
        const d = new Date(parseInt(date))
        return new Response(createCalendar(d), {
          headers: { "Content-Type": "text/html" },
        })
      }
    }
    return new Response("404");
  },
});

const server = Bun.serve({
  port: 3042,
  development: true,
  ...(await serverDef()),
});

setInterval(async () => {
  server.reload(await serverDef());
}, 1000);

async function serveAsset(name) {
  const type = getType(name);
  return new Response(await Bun.file("./assets/" + name).bytes(), {
    headers: { "Content-Type": type },
  });
}

function getType(name) {
  switch (name.split(".").at(-1)) {
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      break;
  }
}
