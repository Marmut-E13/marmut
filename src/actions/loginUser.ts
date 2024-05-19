"use server"

import { sql } from "@vercel/postgres";

export const loginUser = async (email: string, password: string) => {
  try {
    const { rows } = await sql`
      SELECT COUNT(*) FROM AKUN
      WHERE email=${email} AND password=${password}
    `;

    if (rows[0].count > 0) {
      const roles: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'premium')[] = [];

      const [artistRoles, songwriterRoles, podcasterRoles, premiumRoles] = await Promise.all([
        sql`SELECT COUNT(*) FROM ARTIST WHERE email_akun=${email}`,
        sql`SELECT COUNT(*) FROM SONGWRITER WHERE email_akun=${email}`,
        sql`SELECT COUNT(*) FROM PODCASTER WHERE email=${email}`,
        sql`SELECT COUNT(*) FROM PREMIUM WHERE email=${email}`
      ]);

      if (artistRoles.rows[0].count > 0) {
        roles.push('artist');
      }
      if (songwriterRoles.rows[0].count > 0) {
        roles.push('songwriter');
      }
      if (podcasterRoles.rows[0].count > 0) {
        roles.push('podcaster');
      }
      if (premiumRoles.rows[0].count > 0) {
        roles.push('premium');
      }

      if (roles.length === 0) {
        roles.push('pengguna');
      } else if (!roles.includes('pengguna')) {
        roles.push('pengguna');
      }

      console.log("ini roles:", roles);

      return roles as ("" | "pengguna" | "podcaster" | "songwriter" | "artist" | "premium")[];

    }

    const labelResult = await sql`
      SELECT COUNT(*) FROM LABEL
      WHERE email=${email} AND password=${password}
    `;

    if (labelResult.rows[0].count > 0) {
      return ['label'];
    }

    return null;

  } catch (error: any) {
    console.error("Failed to login:", error);
    throw error;
  }
}
