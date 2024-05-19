"use server"

import { sql } from "@vercel/postgres";

export const addAkunPlaySong = async (email: string, idSong: string) => {
    try {
        await sql`
            INSERT INTO AKUN_PLAY_SONG (email_pemain, id_song, waktu)
            VALUES (${email}, ${idSong}, CURRENT_TIMESTAMP + INTERVAL '7 hours');
        `

        await sql`
            UPDATE SONG
            SET total_play = total_play + 1
            WHERE id_konten = ${idSong};
        `;
    } catch (error) {

    }
}