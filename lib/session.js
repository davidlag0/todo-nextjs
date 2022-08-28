// Reference: https://github.com/yeungalan0/site-monorepo/blob/main/my_site/cypress/support/commands.ts
import hkdf from "@panva/hkdf";
import { EncryptJWT } from "jose";
import { v4 as uuid } from "uuid";

// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L113-L121
async function getDerivedEncryptionKey(secret) {
  return hkdf("sha256", secret, "", "NextAuth.js Generated Encryption Key", 32);
}

// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L16-L25
export async function encodeJwt(claims, secret) {
  const maxAge = 30 * 24 * 60 * 60; // 30 days
  const encryptionSecret = await getDerivedEncryptionKey(secret);

  return new EncryptJWT(claims)
    .setProtectedHeader({
      alg: "dir",
      enc: "A256GCM",
    })
    .setIssuedAt()
    .setExpirationTime(Math.round(Date.now() / 1000 + maxAge))
    .setJti(uuid())
    .encrypt(encryptionSecret);
}
