"use server"

import { sql } from "@vercel/postgres";

export const getAllPodcast = async () => {
    
    try{
        const { rows } = await sql`
        SELECT K.judul, P.id_konten FROM PODCAST P, KONTEN K
        WHERE P.id_konten = K.id
        `;

        return rows;

    } catch (error) {

    }
}
