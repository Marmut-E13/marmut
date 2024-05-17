"use server"

import { sql } from "@vercel/postgres";

export const getGenre = async (id: string) => {
    try{
        const { rows } = await sql`
        SELECT genre FROM GENRE
        WHERE id_konten=${id} 
        `;

        console.log(rows)

        return rows;

    } catch (error) {

    }
}