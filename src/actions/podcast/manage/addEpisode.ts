"use server"

import { sql } from "@vercel/postgres";

export const addEpisode = async (formData: FormData, podcastId: string) => {
    try{
        const judul = formData.get("judul") as string;
        const deskripsi = formData.get("deskripsi") as string;
        const durasi = parseInt(formData.get("durasi") as string, 10)
        
       await sql`
       INSERT INTO EPISODE (judul, deskripsi, durasi, id_episode, id_konten_podcast, tanggal_rilis)
       VALUES (${judul}, ${deskripsi}, ${durasi}, gen_random_uuid(), ${podcastId}, CURRENT_DATE)
       `;
        console.log(judul, podcastId);

        

    } catch (error) {
        console.log("error add episode: ", error)
    }
}