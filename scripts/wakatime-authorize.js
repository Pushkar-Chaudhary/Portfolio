import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import process from "node:process";

const redirectUri = "https://wakatime.com/oauth/test";
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) process.loadEnvFile(envPath);
const clientId = process.env.WAKATIME_CLIENT_ID?.trim();
const clientSecret = process.env.WAKATIME_CLIENT_SECRET?.trim();

if (!clientId || !clientSecret) {
  console.error(
    "Add WAKATIME_CLIENT_ID and WAKATIME_CLIENT_SECRET to portfolio/.env.local first."
  );
  process.exitCode = 1;
} else {
  const state = randomBytes(32).toString("hex");
  const authorizeUrl = new URL("https://wakatime.com/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "read_stats");
  authorizeUrl.searchParams.set("state", state);

  const prompt = createInterface({ input: stdin, output: stdout });

  try {
    console.log("Open this URL and authorize the app:\n");
    console.log(authorizeUrl.toString());
    const callbackUrl = await prompt.question(
      "\nPaste the full redirected WakaTime URL here: "
    );
    const callback = new URL(callbackUrl.trim());

    if (
      callback.origin !== "https://wakatime.com" ||
      callback.pathname !== "/oauth/test" ||
      callback.searchParams.get("state") !== state
    ) {
      throw new Error("The callback URL or OAuth state did not match.");
    }

    const code = callback.searchParams.get("code");
    if (!code) {
      throw new Error("The callback URL did not contain an authorization code.");
    }

    const tokenResponse = await fetch("https://wakatime.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || typeof tokenData.access_token !== "string") {
      const reason =
        typeof tokenData.error_description === "string"
          ? tokenData.error_description
          : typeof tokenData.error === "string"
            ? tokenData.error
            : `HTTP ${tokenResponse.status}`;
      throw new Error(
        `WakaTime did not issue an access token: ${reason}. Check the app credentials and authorized redirect URI, then try again with a fresh authorization code.`
      );
    }

    let envContents = "";
    try {
      envContents = await readFile(envPath, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    const tokenLine = `WAKATIME_OAUTH_ACCESS_TOKEN=${tokenData.access_token}`;
    const tokenSetting = /^WAKATIME_OAUTH_ACCESS_TOKEN=.*$/m;
    envContents = tokenSetting.test(envContents)
      ? envContents.replace(tokenSetting, tokenLine)
      : `${envContents}${envContents && !envContents.endsWith("\n") ? "\n" : ""}${tokenLine}\n`;

    await writeFile(envPath, envContents, "utf8");
    console.log(
      "\nWakaTime access token saved to the ignored portfolio/.env.local file. Restart the dev server to load it."
    );
    console.log(
      "For production, set WAKATIME_OAUTH_ACCESS_TOKEN in Vercel Environment Variables. Do not share or commit the token."
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    prompt.close();
  }
}
