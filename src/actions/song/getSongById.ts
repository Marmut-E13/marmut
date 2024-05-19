"use server"

import { sql } from "@vercel/postgres";

export const getSongById = async (id: string) => {
    try{
        const { rows } = await sql`
            SELECT
                s.id_konten AS id,
                s.total_play,
                s.total_download,
                k.judul AS konten_judul,
                k.tanggal_rilis,
                k.tahun,
                k.durasi,
                a.id AS artist_id,
                a.email_akun AS artist_email,
                a.id_pemilik_hak_cipta AS artist_pemilik_hak_cipta,
                al.id AS album_id,
                al.judul AS album_judul,
                al.jumlah_lagu,
                al.id_label,
                al.total_durasi AS album_total_durasi
            FROM
                SONG s
                JOIN KONTEN k ON s.id_konten = k.id
                JOIN ARTIST a ON s.id_artist = a.id
                JOIN ALBUM al ON s.id_album = al.id
            WHERE
                s.id_konten = ${id};
        `;
        
        const song = rows.map(row => ({
            konten: {
                id: row.id,
                judul: row.konten_judul,
                tanggal_rilis: row.tanggal_rilis,
                tahun: row.tahun,
                durasi: row.durasi
            },
            artist: {
                id: row.artist_id,
                email_akun: row.artist_email,
                id_pemilik_hak_cipta: row.artist_pemilik_hak_cipta
            },
            album: {
                id: row.album_id,
                judul: row.album_judul,
                jumlah_lagu: row.jumlah_lagu,
                id_label: row.id_label,
                total_durasi: row.album_total_durasi
            },
            total_play: row.total_play,
            total_download: row.total_download
            }));

        return song[0];    

    } catch (error) {

    }
}