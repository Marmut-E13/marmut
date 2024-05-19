"use server"

import { sql } from "@vercel/postgres";

export const updateEpisode = async (formData: FormData, episodeId: string) => {
    try{
        const judul = formData.get("judul") as string;
        const deskripsi = formData.get("deskripsi") as string;
        const durasi = parseInt(formData.get("durasi") as string, 10)
        
       await sql`
            UPDATE EPISODE
            SET judul = ${judul}, deskripsi = ${deskripsi}, durasi = ${durasi}
            WHERE id_episode = ${episodeId}
       `;

        console.log(judul, episodeId);

        

    } catch (error) {
        console.log("error update episode: ", error)
    }
}