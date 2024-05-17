"use server"

import { sql } from "@vercel/postgres";

export const getEpisodeByPodcastId = async (idPodcast: string) => {
    
    try{
        const { rows } = await sql`
        SELECT E.judul, E.deskripsi, E.durasi, E.tanggal_rilis
        FROM EPISODE E, PODCAST P
        WHERE P.id_konten = E.id_konten_podcast AND P.id_konten = ${idPodcast}
        ORDER BY E.tanggal_rilis ASC
        `;


        return rows;

    } catch (error) {

    }
}
