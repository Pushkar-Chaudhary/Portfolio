import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import process from "node:process";

const redirectUri = "https://wakatime.com/oauth/test";
const envPath = existsSync(resolve(process.cwd(), ".env.local"))
  ? resolve(process.cwd(), ".env.local")
  : resolve(process.cwd(), ".env");
if (existsSync(envPath)) process.loadEnvFile(envPath);
const clientId = process.env.WAKATIME_CLIENT_ID?.trim();
const clientSecret = process.env.WAKATIME_CLIENT_SECRET?.trim();

function exchangeAuthorizationCode(fields) {
  return new Promise((resolve, reject) => {
    const request = spawn(
      "curl",
      [
        "--silent",
        "--show-error",
        "--fail-with-body",
        "--request",
        "POST",
        "--header",
        "Content-Type: application/x-www-form-urlencoded",
        "--data-binary",
        "@-",
        "https://wakatime.com/oauth/token",
      ],
      { stdio: ["pipe", "pipe", "pipe"] }
    );
    let responseBody = "";
    let errorOutput = "";

    request.stdout.setEncoding("utf8");
    request.stderr.setEncoding("utf8");
    request.stdout.on("data", (chunk) => {
      responseBody += chunk;
    });
    request.stderr.on("data", (chunk) => {
      errorOutput += chunk;
    });
    request.on("error", reject);
    request.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(errorOutput.trim() || `curl exited with code ${code}`));
        return;
      }
      try {
        resolve(JSON.parse(responseBody));
      } catch {
        reject(new Error("WakaTime returned an invalid token response."));
      }
    });

    request.stdin.end(new URLSearchParams(fields).toString());
  });
}

if (!clientId || !clientSecret) {
  console.error(
    "Add WAKATIME_CLIENT_ID and WAKATIME_CLIENT_SECRET to .env first."
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

    let tokenData;
    try {
      tokenData = await exchangeAuthorizationCode({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      });
    } catch (error) {
      throw new Error(`Could not exchange the WakaTime authorization code: ${error.message}`, { cause: error });
    }

    if (typeof tokenData.access_token !== "string") {
      const reason =
        typeof tokenData.error_description === "string"
          ? tokenData.error_description
          : typeof tokenData.error === "string"
            ? tokenData.error
            : "the response did not include an access token";
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
