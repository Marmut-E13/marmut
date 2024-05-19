"use server"

import { sql } from "@vercel/postgres";

export const getPlaylist = async (email: string) => {
    try{
        const { rows } = await sql`
        SELECT * FROM USER_PLAYLIST
        WHERE email_pembuat=${email}
        `;

        console.log("ke sini", rows);
        console.log("Ini juga", email)
        
        return rows;

    } catch (error) {

    }
}