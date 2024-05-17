"use server"

import { sql } from "@vercel/postgres";

export const addAkunPlaySong = async (email: string, idSong: string) => {
    try {
        await sql`
            INSERT INTO AKUN_PLAY_SONG (email_pemain, id_song, waktu)
            VALUES (${email}, ${idSong}, CURRENT_TIMESTAMP);
        `
    } catch (error) {

    }
}