"use server"

import { sql } from "@vercel/postgres";

interface TransactionData {
    jenis_paket: string;
    email: string;
    timestamp_dimulai: string;
    timestamp_berakhir: string;
    metode_bayar: string;
    nominal: number;
}

export const getTransactionHistory = async (email: string): Promise<TransactionData[]> => {
    try {
        const { rows } = await sql`
            SELECT jenis_paket, email, timestamp_dimulai, timestamp_berakhir, metode_bayar, nominal
            FROM TRANSACTION
            WHERE email = ${email}
        `;

        // Map the rows to TransactionData
        const transactionHistory: TransactionData[] = rows.map(row => ({
            jenis_paket: row.jenis_paket,
            email: row.email,
            timestamp_dimulai: row.timestamp_dimulai,
            timestamp_berakhir: row.timestamp_berakhir,
            metode_bayar: row.metode_bayar,
            nominal: row.nominal
        }));

        return transactionHistory;
    } catch (error) {
        console.error("Failed to fetch transaction history:", error);
        throw error;
    }
}
