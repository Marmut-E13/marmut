"use server"

import { sql } from "@vercel/postgres";

export const addDownloadedSong = async (idSong: string, email: string) => {
    try{
        const { rows } = await sql`
            SELECT COUNT(*)
            FROM DOWNLOADED_SONG
            WHERE id_song=${idSong} AND id_song=${idSong};
        `;

        // console.log(rows);

        if (rows[0].count === '0') {
            const { rows } = await sql`
                INSERT INTO DOWNLOADED_SONG (id_song, email_downloader)
                VALUES (${idSong}, ${email});
            `;

            await sql`
                UPDATE SONG
                SET jumlah_download = jumlah_download + 1
                WHERE id_konten=${email};
            `;
            return rows[0];
        } else {
            return { error: 'Error: Lagu sudah ada di downloaded song!!' };
        }
    } catch (error) {

    }
}