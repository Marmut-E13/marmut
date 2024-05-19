"use server"

import { sql } from "@vercel/postgres";

export const deleteEpisode = async (episodeId: string) => {
    try{
        
       await sql`
       DELETE FROM EPISODE WHERE id_episode = ${episodeId}
       `;
        
       console.log(episodeId);

        

    } catch (error) {
        console.log("error delete episode: ", error)
    }
}