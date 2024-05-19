"use server"

import { sql } from "@vercel/postgres";

export const addAkunPlayPlaylist = async (emailPemain: string, idUserPlaylist: string, emailPembuat: string) => {
    try {
        await sql`
            INSERT INTO AKUN_PLAY_USER_PLAYLIST (email_pemain, id_user_playlist, email_pembuat, waktu)
            VALUES (${emailPemain}, ${idUserPlaylist}, ${emailPembuat}, CURRENT_TIMESTAMP + INTERVAL '7 hours');
        `;
    } catch (error){

    }
}