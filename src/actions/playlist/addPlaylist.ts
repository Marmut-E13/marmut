"use server"

import { sql } from "@vercel/postgres";

export const addPlaylist = async (formData: FormData, email: string) => {
    try{
        const judul = formData.get("judul") as string;
        const deskripsi = formData.get("deskripsi") as string;

        const newPlaylist = await sql`
            INSERT INTO PLAYLIST (id)
            VALUES (gen_random_uuid())
            RETURNING id
        `;

        const { rows } = await sql`
            INSERT INTO USER_PLAYLIST (email_pembuat, id_user_playlist, judul, deskripsi, jumlah_lagu, tanggal_dibuat, id_playlist, total_durasi)
            VALUES (${email}, gen_random_uuid(), ${judul}, ${deskripsi}, 0, CURRENT_DATE, ${newPlaylist.rows[0].id}, 0)
        `;

        return rows[0];

    } catch (error) {
        console.log("error bro: ", error)
    }
}