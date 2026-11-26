import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import githubHandler from "./src/lib/server/github.js";
import spotifyHandler from "./src/lib/server/spotify.js";
import wakatimeHandler from "./src/lib/server/wakatime.js";

const apiHandlers = {
  "/api/github": githubHandler,
  "/api/spotify": spotifyHandler,
  "/api/wakatime": wakatimeHandler,
};

function localApiPlugin() {
  return {
    name: "portfolio-local-api",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const handler = apiHandlers[new URL(request.url, "http://localhost").pathname];
        if (!handler) return next();

        response.status = (code) => {
          response.statusCode = code;
          return response;
        };
        response.json = (data) => {
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(data));
          return response;
        };

        try {
          await handler(request, response);
        } catch (error) {
          if (response.writableEnded) return;
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ error: "API request failed.", details: error.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            if (id.includes("react") || id.includes("scheduler")) return "react-vendor";
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("react-icons")) return "icons";
            return undefined;
          },
        },
      },
    },
  };
});
