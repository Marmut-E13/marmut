"use server"

import { sql } from "@vercel/postgres";

export const getPlaylist = async (email: string) => {
    try{
        console.log("ini imel, ", email);
        const { rows } = await sql`
        SELECT * FROM USER_PLAYLIST
        WHERE email_pembuat=${email}
        `;

        console.log("atas");
        console.log(rows[0]);

        return rows;

    } catch (error) {

    }


    // return rows[0].
}