"use server"

import { sql } from "@vercel/postgres";

export const getAllPodcasterPodcast = async (podcasterEmail: string) => {
    
    try{

        const { rows } = await sql`
        SELECT P.id_konten, K.judul, COALESCE(SUM(E.durasi), 0) AS durasi, COALESCE(COUNT(E.judul), 0) AS total_episode 
        FROM PODCAST P
        INNER JOIN KONTEN K ON P.id_konten = K.id
        LEFT JOIN EPISODE E ON E.id_konten_podcast = P.id_konten
        WHERE P.email_podcaster = 'rizky.fadillah@outlook.com'
        GROUP BY P.id_konten, K.judul;
        `;

        
        return rows;

    } catch (error) {

    }
}
