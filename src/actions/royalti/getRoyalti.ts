"use server"

import { sql } from "@vercel/postgres";

export const fetchRoyalti = async (idPemilikHakCipta: string) => {
  try {
    const query = `
    SELECT 
        k.id AS id_konten, k.judul AS title, alb.judul AS album,
        s.total_play, s.total_download,
        r.jumlah AS jumlah_royalti, p.rate_royalti,
        (s.total_play * p.rate_royalti) AS total_royalti
    FROM royalti r
    JOIN song s ON r.id_song = s.id_konten
    JOIN konten k ON s.id_konten = k.id
    LEFT JOIN album alb ON s.id_album = alb.id
    JOIN pemilik_hak_cipta p ON r.id_pemilik_hak_cipta = p.id
    JOIN artist a ON s.id_artist = a.id
    JOIN akun ak ON a.email_akun = ak.email
    WHERE ak.email = $1
    UNION
    SELECT 
        k.id AS id_konten, k.judul AS title, alb.judul AS album,
        s.total_play, s.total_download,
        r.jumlah AS jumlah_royalti, p.rate_royalti,
        (s.total_play * p.rate_royalti) AS total_royalti
    FROM royalti r
    JOIN song s ON r.id_song = s.id_konten
    JOIN konten k ON s.id_konten = k.id
    LEFT JOIN album alb ON s.id_album = alb.id
    JOIN pemilik_hak_cipta p ON r.id_pemilik_hak_cipta = p.id
    JOIN label l ON alb.id_label = l.id
    WHERE l.email = $1
    UNION
    SELECT 
        k.id AS id_konten, k.judul AS title, alb.judul AS album,
        s.total_play, s.total_download,
        r.jumlah AS jumlah_royalti, p.rate_royalti,
        (s.total_play * p.rate_royalti) AS total_royalti
    FROM royalti r
    JOIN song s ON r.id_song = s.id_konten
    JOIN konten k ON s.id_konten = k.id
    LEFT JOIN album alb ON s.id_album = alb.id
    JOIN pemilik_hak_cipta p ON r.id_pemilik_hak_cipta = p.id
    JOIN songwriter_write_song sws ON s.id_konten = sws.id_song
    JOIN songwriter sw ON sws.id_songwriter = sw.id
    JOIN akun ak ON sw.email_akun = ak.email
    WHERE ak.email = $1
    `;
    const { rows } = await sql.query(query, [idPemilikHakCipta]);
    return rows;
  } catch (error) {
    console.error("Failed to fetch royalties:", error);
    return { error: 'Failed to fetch royalties due to a server error.' };
  }
}