"use server"

import { sql } from "@vercel/postgres";

export const getKontenById = async (id: string) => {
    try{
        const { rows } = await sql`
        SELECT * FROM KONTEN
        WHERE id=${id} 
        `;

        console.log(rows[0])

        return rows[0];

    } catch (error) {

    }
}