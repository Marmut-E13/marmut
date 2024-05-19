"use server"

import { sql } from "@vercel/postgres";

export const getSongwriterBySongId = async(idSong: string) => {
    try{
        const { rows } = await sql`
            SELECT akun.nama AS songwriter_name
            FROM SONGWRITER_WRITE_SONG sws
            JOIN SONGWRITER sw ON sws.id_songwriter = sw.id
            JOIN AKUN akun ON sw.email_akun = akun.email
            WHERE sws.id_song = ${idSong};
        `;

        console.log("ini woi", rows);
        return rows;

    } catch(error) {

    }
}