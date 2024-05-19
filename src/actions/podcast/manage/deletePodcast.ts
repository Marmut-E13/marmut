"use server"

import { sql } from "@vercel/postgres";

export const deletePodcast = async (podcastId: string) => {
    try{
        
       await sql`
       DELETE FROM KONTEN WHERE id = ${podcastId}
       `;
        
       console.log(podcastId);

        

    } catch (error) {
        console.log("error delete podcast: ", error)
    }
}