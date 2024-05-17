"use server"

import { sql } from "@vercel/postgres";

interface PaketData {
    jenis: string;
    harga: number;
}

export const getPaket = async (): Promise<PaketData[]> => {
    try {
        const { rows } = await sql`
      SELECT jenis, harga FROM PAKET
    `;

        // Map the rows to PaketData
        const paketData: PaketData[] = rows.map(row => ({
            jenis: row.jenis,
            harga: row.harga
        }));

        return paketData;
    } catch (error) {
        console.error("Failed to fetch paket:", error);
        throw error;
    }
}
