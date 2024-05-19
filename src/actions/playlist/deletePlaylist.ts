"use server"

import { sql } from "@vercel/postgres";

export const deletePlaylist = async (idUserPlaylist: string, email: string) => {

    console.log("masuk sini")
    try{
        await sql`
            DELETE FROM AKUN_PLAY_USER_PLAYLIST
            WHERE id_user_playlist=${idUserPlaylist};
        `
        await sql`
            DELETE FROM USER_PLAYLIST
            WHERE email_pembuat = ${email} AND id_user_playlist = ${idUserPlaylist}
        `;

        console.log("selesai");
    } catch (error) {
        console.log("error: ", error)
    }
}