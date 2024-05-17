"use server"

import { sql } from "@vercel/postgres";

export const getPlaylistById = async (id: string) => {
    try{
        const { rows } = await sql`
        SELECT * FROM USER_PLAYLIST
        WHERE id_playlist=${id} 
        `;

        return rows;

    } catch (error) {

    }
}