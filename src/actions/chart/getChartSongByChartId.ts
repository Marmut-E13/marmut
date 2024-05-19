"use server"

import { sql } from "@vercel/postgres";

export const getChartSongByChartId = async () => {
    
    try{
        const { rows } = await sql`
        SELECT S.id_konten, K.judul, AK.nama, K.tanggal_rilis, S.total_play FROM SONG S, KONTEN K, ARTIST A, AKUN AK
        WHERE S.id_konten = K.id AND S.id_artist = A.id AND A.email_akun = AK.email
        ORDER BY S.total_play DESC
        LIMIT 20
        `;

        return rows;

    } catch (error) {

    }
}
