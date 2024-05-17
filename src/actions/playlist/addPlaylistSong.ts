"use server"

import { sql } from "@vercel/postgres";

export const addPlaylistSong = async (idSong: string, email: string, idPlaylist: string) => {
    try{
        const { rows } = await sql`
            SELECT COUNT(*)
            FROM PLAYLIST_SONG
            WHERE id_playlist=${idPlaylist} AND id_song=${idSong};
        `;

        console.log(rows);

        if (rows[0].count === '0') {
            const { rows } = await sql`
                INSERT INTO PLAYLIST_SONG (id_playlist, id_song)
                VALUES (${idPlaylist}, ${idSong});
            `;

            await sql`
                UPDATE USER_PLAYLIST
                SET jumlah_lagu = jumlah_lagu + 1
                WHERE id_playlist=${idPlaylist};
            `;
            return rows[0];
        } else {
            return { error: 'Error: Lagu sudah ada di playlist!!' };
        }
    } catch (error) {

    }
}