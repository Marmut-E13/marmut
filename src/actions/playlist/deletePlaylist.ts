"use server"

import { sql } from "@vercel/postgres";

export const deletePlaylist = async (idUserPlaylist: string, email: string) => {

    try{
        await sql`
        DELETE FROM USER_PLAYLIST
        WHERE email_pembuat = ${email} AND id_user_playlist = ${idUserPlaylist}
        `;

        await sql`
            UPDATE USER_PLAYLIST
            SET jumlah_lagu = jumlah_lagu - 1
            WHERE id_user_playlist=${idUserPlaylist} AND email=${email};
        `;

        console.log("selesai");
    } catch (error) {

    }
}