// Reports the account's current Spotify playback without exposing tokens.

import process from "node:process";

let cachedAccessToken = "";
let accessTokenExpiresAt = 0;

async function getAccessToken(clientId, refreshToken) {
  if (cachedAccessToken && Date.now() < accessTokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Spotify token refresh failed (HTTP ${tokenResponse.status}).`);
  }

  const tokenData = await tokenResponse.json();
  if (typeof tokenData.access_token !== "string") {
    throw new Error("Spotify did not return an access token.");
  }

  cachedAccessToken = tokenData.access_token;
  accessTokenExpiresAt = Date.now() + (tokenData.expires_in || 3600) * 1000;
  return cachedAccessToken;
}

function noPlayback(configured) {
  return { configured, isListening: false };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.method && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const clientId = (process.env.SPOTIFY_CLIENT_ID || "").trim();
  const refreshToken = (process.env.SPOTIFY_REFRESH_TOKEN || "").trim();
  if (!clientId || !refreshToken) {
    return res.status(200).json(noPlayback(false));
  }

  try {
    const accessToken = await getAccessToken(clientId, refreshToken);
    const playbackResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (playbackResponse.status === 204) {
      return res.status(200).json(noPlayback(true));
    }
    if (!playbackResponse.ok) {
      if (playbackResponse.status === 401) {
        cachedAccessToken = "";
        accessTokenExpiresAt = 0;
      }
      throw new Error(`Spotify playback check failed (HTTP ${playbackResponse.status}).`);
    }

    const playback = await playbackResponse.json();
    const item = playback.item;
    if (!playback.is_playing || !item || item.type !== "track") {
      return res.status(200).json(noPlayback(true));
    }

    return res.status(200).json({
      configured: true,
      isListening: true,
      track: item.name,
      artist: (item.artists || []).map((artist) => artist.name).join(", "),
      album: item.album?.name || "",
      artwork: item.album?.images?.[0]?.url || "",
      url: item.external_urls?.spotify || "",
    });
  } catch (error) {
    return res.status(502).json({
      error: "Unable to check Spotify playback right now.",
      details: error.message,
    });
  }
}
