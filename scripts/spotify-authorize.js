import { createHash, randomBytes } from "node:crypto";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { loadEnv } from "vite";

const port = 8888;
const redirectUri = `http://127.0.0.1:${port}/callback`;
const clientId = loadEnv("development", process.cwd(), "")
  .SPOTIFY_CLIENT_ID?.trim();

if (!clientId) {
  console.error("Add SPOTIFY_CLIENT_ID to portfolio/.env.local first.");
  process.exitCode = 1;
} else {
  const state = randomBytes(24).toString("hex");
  const verifier = randomBytes(48).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "user-read-currently-playing");
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("code_challenge", challenge);
  authorizeUrl.searchParams.set("state", state);

  const server = createServer(async (req, res) => {
    const callback = new URL(req.url, redirectUri);
    if (callback.pathname !== "/callback") {
      res.writeHead(404).end("Not found");
      return;
    }
    if (callback.searchParams.get("state") !== state) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Spotify authorization state did not match. Close this tab and retry.");
      return;
    }

    const code = callback.searchParams.get("code");
    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("No authorization code was returned. Close this tab and retry.");
      server.close();
      return;
    }

    try {
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          code_verifier: verifier,
        }),
      });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || typeof tokenData.refresh_token !== "string") {
        const reason =
          typeof tokenData.error_description === "string"
            ? tokenData.error_description
            : typeof tokenData.error === "string"
              ? tokenData.error
              : `HTTP ${tokenResponse.status}`;
        throw new Error(`Spotify did not issue a refresh token: ${reason}.`);
      }

      const envPath = resolve(process.cwd(), ".env.local");
      let envContents = "";
      try {
        envContents = await readFile(envPath, "utf8");
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }

      const settings = {
        SPOTIFY_CLIENT_ID: clientId,
        SPOTIFY_REFRESH_TOKEN: tokenData.refresh_token,
      };
      for (const [name, value] of Object.entries(settings)) {
        const line = `${name}=${value}`;
        const setting = new RegExp(`^${name}=.*$`, "m");
        envContents = setting.test(envContents)
          ? envContents.replace(setting, line)
          : `${envContents}${envContents && !envContents.endsWith("\n") ? "\n" : ""}${line}\n`;
      }

      await writeFile(envPath, envContents, "utf8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<!doctype html><title>Spotify connected</title><p>Spotify is connected. You can close this tab and restart your portfolio server.</p>"
      );
      console.log("Spotify refresh token saved to the ignored .env.local file.");
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<!doctype html><title>Spotify setup failed</title><p>Spotify setup failed. Check the terminal for a safe error message.</p>"
      );
      console.error(error.message);
    } finally {
      server.close();
    }
  });

  server.on("error", (error) => {
    console.error(`Could not start the local Spotify callback listener: ${error.message}`);
    process.exitCode = 1;
  });

  server.listen(port, "127.0.0.1", () => {
    console.log("Open this Spotify authorization URL in your browser:\n");
    console.log(authorizeUrl.toString());
    console.log("\nWaiting for Spotify authorization to complete...");
  });
}
