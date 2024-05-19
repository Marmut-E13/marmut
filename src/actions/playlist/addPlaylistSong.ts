"use server"

import { sql } from "@vercel/postgres";

export const addPlaylistSong = async (idSong: string, email: string, idPlaylist: string) => {
    try {
        const { rows } = await sql`
            SELECT COUNT(*)
            FROM PLAYLIST_SONG
            WHERE id_playlist=${idPlaylist} AND id_song=${idSong};
        `;

        if (rows[0].count === '0') {
            await sql`
                INSERT INTO PLAYLIST_SONG (id_playlist, id_song)
                VALUES (${idPlaylist}, ${idSong});
            `;

            await sql`
                UPDATE USER_PLAYLIST
                SET jumlah_lagu = jumlah_lagu + 1
                WHERE id_playlist=${idPlaylist};
            `;

            const { rows } = await sql`
                SELECT SUM(K.durasi) AS total_duration
                FROM USER_PLAYLIST UP
                INNER JOIN PLAYLIST_SONG PS ON UP.id_playlist = PS.id_playlist
                INNER JOIN SONG S ON PS.id_song = S.id_konten
                INNER JOIN KONTEN K ON S.id_konten = K.id
                WHERE UP.id_playlist = ${idPlaylist};
            `;

            // console.log("ke sini bro: ", rows[0])

            await sql`
                UPDATE USER_PLAYLIST
                SET total_durasi = ${rows[0].total_duration}
                WHERE id_playlist = ${idPlaylist};
            `;

            return { success: true };
        } else {
            console.log("error bro")
            return { error: 'Error: Lagu sudah ada di playlist!!' };
        }
    } catch (error) {

    }
}