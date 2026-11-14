import { spawn } from "node:child_process";

export function curlJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const request = spawn(
      "curl",
      ["--config", "-", "--write-out", "\n%{http_code}"],
      { stdio: ["pipe", "pipe", "pipe"] }
    );
    let output = "";
    let errorOutput = "";

    request.stdout.setEncoding("utf8");
    request.stderr.setEncoding("utf8");
    request.stdout.on("data", (chunk) => {
      output += chunk;
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

      const statusSeparator = output.lastIndexOf("\n");
      const status = Number(output.slice(statusSeparator + 1));
      const responseBody = output.slice(0, statusSeparator);
      try {
        const data = JSON.parse(responseBody);
        resolve({
          ok: status >= 200 && status < 300,
          status,
          json: async () => data,
        });
      } catch {
        reject(new Error(`Remote service returned an invalid response (HTTP ${status}).`));
      }
    });

    const quoteConfig = (value) => `"${value.replace(/[\\"]/g, "\\$&")}"`;
    const config = [
      "silent",
      "show-error",
      `url = ${quoteConfig(url)}`,
      ...Object.entries(headers).map(([name, value]) =>
        `header = ${quoteConfig(`${name}: ${value}`)}`
      ),
    ].join("\n");
    request.stdin.end(config);
  });
}
