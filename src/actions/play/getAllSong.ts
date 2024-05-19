"use server"

import { sql } from "@vercel/postgres";

export const getAllSong = async () => {

    try{
        const { rows } = await sql`
        SELECT K.judul, S.id_konten FROM SONG S, KONTEN K
        WHERE S.id_konten = K.id
        `;

        return rows;

    } catch (error) {

    }
}