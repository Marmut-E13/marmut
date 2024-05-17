"use server"

import { sql } from "@vercel/postgres";

export const getAllSong = async () => {
    try {
        const { rows } = await sql`
            SELECT id, judul
            FROM KONTEN
            JOIN SONG ON KONTEN.id = SONG.id_konten;
        `;

        return rows;
    } catch (error) {

    }
}