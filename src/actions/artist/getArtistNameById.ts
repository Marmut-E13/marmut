"use server"

import { sql } from "@vercel/postgres";

export const getArtistNameById = async (id: string) => {
    try{
        const { rows } = await sql`
        SELECT A.nama
        FROM ARTIST AR
        JOIN AKUN A ON AR.email_akun = A.email
        WHERE AR.id = ${id};
    `;

        console.log("ini nama", rows[0].nama);

        return rows[0].nama;

    } catch (error) {
        console.log("Error: ", error)
    }
}