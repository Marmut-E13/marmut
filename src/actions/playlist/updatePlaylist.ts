"use server"

import { sql } from "@vercel/postgres";

export const updatePlaylist = async (email: string, id: string, formData: FormData) => {
    try {
        const judul = formData.get("judul") as string;
        const deskripsi = formData.get("deskripsi") as string;

        await sql`
            UPDATE USER_PLAYLIST
            SET judul = ${judul}, deskripsi = ${deskripsi}
            WHERE email_pembuat=${email} AND id_user_playlist=${id};
        `;
    } catch (error) {
    }
}
