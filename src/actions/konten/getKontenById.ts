"use server"

import { sql } from "@vercel/postgres";

export const getKontenById = async (id: string) => {
    try{
        const { rows } = await sql`
        SELECT * FROM KONTEN
        WHERE id=${id} 
        `;

        return rows[0];

    } catch (error) {

    }
}