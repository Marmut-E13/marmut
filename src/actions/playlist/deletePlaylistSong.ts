"use server"

import { sql } from "@vercel/postgres";

export const deletePlaylistSong = async (idPlaylist: string, idSong: string) => {
    try {
        const { rows: [{ durasi }] } = await sql`
            SELECT K.durasi
            FROM KONTEN K
            INNER JOIN SONG S ON K.id = S.id_konten
            WHERE S.id_konten = ${idSong};
        `;

        await sql`
            DELETE FROM PLAYLIST_SONG
            WHERE id_playlist=${idPlaylist} AND id_song=${idSong};
        `;

        await sql`
            UPDATE USER_PLAYLIST
            SET jumlah_lagu = jumlah_lagu - 1
            WHERE id_playlist=${idPlaylist};
        `;

        await sql`
            UPDATE USER_PLAYLIST
            SET total_durasi = total_durasi - ${durasi}
            WHERE id_playlist=${idPlaylist};
        `;
    } catch (error) {
        console.log("Error: ", error)
    }
}