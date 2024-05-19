"use server"

import { sql } from "@vercel/postgres";

export const loginUser = async (email: string, password: string) => {
  try {
    const { rows } = await sql`
      SELECT COUNT(*) FROM AKUN
      WHERE email=${email} AND password=${password}
    `;

    if (rows[0].count > 0) {
      // await sql`CALL cek_status_langganan(${email})`
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

      // console.log("ini roles:", roles);

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

export const getUserData = async (email: string) => {
  try {
    const query = `
      SELECT a.email, a.nama AS name, p.id AS idPemilikHakCipta
      FROM akun a
      LEFT JOIN artist ar ON a.email = ar.email_akun
      LEFT JOIN songwriter sw ON a.email = sw.email_akun
      LEFT JOIN pemilik_hak_cipta p ON ar.id_pemilik_hak_cipta = p.id OR sw.id_pemilik_hak_cipta = p.id
      WHERE a.email = $1
      UNION
      SELECT l.email, l.nama AS name, l.id_pemilik_hak_cipta AS idPemilikHakCipta
      FROM label l
      WHERE l.email = $1
    `;
    const { rows } = await sql.query(query, [email]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows[0];
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
