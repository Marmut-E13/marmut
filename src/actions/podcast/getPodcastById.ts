"use server"

import { sql } from "@vercel/postgres";


export const getPodcastDetails = async (idPodcast: string) => {
  try {
    const { rows } = await sql`
      SELECT K.judul, STRING_AGG(DISTINCT G.genre, ', ') AS genre, A.nama, K.tanggal_rilis, K.tahun  FROM PODCAST P, KONTEN K, GENRE G, AKUN A
      WHERE P.id_konten = K.id AND G.id_konten = K.id AND P.email_podcaster=A.email AND P.id_konten = ${idPodcast}
      GROUP BY K.judul, A.nama, K.tanggal_rilis, K.tahun
    `;
  

    
    return rows;
    
} catch (error: any) {
      console.error("Failed to login:", error);
    }
    
    
}
