"use server"

import { sql } from "@vercel/postgres";

export const getChartById = async (chartId: string) => {
    
    try{
        const { rows } = await sql`
        SELECT * FROM CHART
        WHERE id_playlist = ${chartId}
        `;

        return rows;

    } catch (error) {

    }
}
