"use server"

import { sql } from "@vercel/postgres";

export const getAllChart = async () => {
    
    try{
        const { rows } = await sql`
        SELECT * FROM CHART
        `;

        return rows;

    } catch (error) {

    }
}
