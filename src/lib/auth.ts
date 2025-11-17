import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "fb_token";
const DEFAULT_SECRET = "dev-secret-do-not-use-in-prod"; // replace via env in production

function getSecret() {
  return process.env.AUTH_SECRET || DEFAULT_SECRET;
}

export type SessionUser = { id: number; email: string; name?: string };

export function sign(payload: object) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verify<T = unknown>(token: string | undefined | null): T | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function setAuthCookie(data: SessionUser) {
  const token = sign(data);
  const ck = await cookies();
  ck.set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", path: "/" });
}

export async function clearAuthCookie() {
  const ck = await cookies();
  ck.delete(COOKIE_NAME);
}

export async function getAuthUser(): Promise<SessionUser | null> {
  const ck = await cookies();
  const token = ck.get(COOKIE_NAME)?.value;
  const parsed = verify<SessionUser>(token);
  if (!parsed) return null;
  return parsed;
}
