// src/actions/saveTransaction.ts

import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

interface TransactionData {
    jenis_paket: string;
    email: string;
    timestamp_dimulai: string;
    timestamp_berakhir: string;
    metode_bayar: string;
    nominal: number;
}

export const saveTransaction = async (transactionData: TransactionData) => {
    try {
        const transactionId = uuidv4();
        await sql`
            INSERT INTO TRANSACTION (
                id, jenis_paket, email, timestamp_dimulai, timestamp_berakhir, metode_bayar, nominal
            ) VALUES (
                ${transactionId}, ${transactionData.jenis_paket}, ${transactionData.email}, ${transactionData.timestamp_dimulai}, ${transactionData.timestamp_berakhir}, ${transactionData.metode_bayar}, ${transactionData.nominal}
            )
        `;
    } catch (error) {
        console.error("Failed to save transaction:", error);
        throw error;
    }
};
