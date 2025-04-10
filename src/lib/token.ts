import { db } from "@/db";
import { account } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAccessToken(userId: string) {
  const user = await db
    .select({
      accessToken: account.accessToken,
      accessTokenExpiresAt: account.accessTokenExpiresAt,
      refreshToken: account.refreshToken,
    })
    .from(account)
    .where(eq(account.userId, userId));

  if (
    !user[0].accessToken ||
    !user[0].accessTokenExpiresAt ||
    !user[0].refreshToken
  ) {
    throw new Error("No access token or refresh token");
  }

  const isExpired =
    new Date(user[0].accessTokenExpiresAt).getTime() < Date.now() - 60000;

  if (!isExpired) {
    return user[0].accessToken;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: user[0].refreshToken,
    }).toString(),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await res.json();

  await db
    .update(account)
    .set({
      accessToken: data.access_token,
      accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
    })
    .where(eq(account.userId, userId));

  return data.access_token;
}
