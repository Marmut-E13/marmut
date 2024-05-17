"use server"

import { sql } from "@vercel/postgres";

export const deletePlaylist = async (idUserPlaylist: string, email: string) => {

    try{
        await sql`
        DELETE FROM USER_PLAYLIST
        WHERE email_pembuat = ${email} AND id_user_playlist = ${idUserPlaylist}
        `;

        console.log("selesai");
    } catch (error) {

    }
}