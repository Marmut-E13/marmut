"use server"

import { sql } from "@vercel/postgres";

export const getSumEpisodeDuration = async (idPodcast: string) => {
    
    try{
        const { rows } = await sql`
        SELECT SUM(durasi)
        FROM EPISODE E, PODCAST P
        WHERE P.id_konten = E.id_konten_podcast AND P.id_konten = ${idPodcast}
        `;

        console.log(rows)
        
        return rows;

    } catch (error) {

    }
}
