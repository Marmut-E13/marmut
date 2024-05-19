"use server"

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

        // Insert into TRANSACTION table
        await sql`
            INSERT INTO TRANSACTION (
                id, jenis_paket, email, timestamp_dimulai, timestamp_berakhir, metode_bayar, nominal
            ) VALUES (
                         ${transactionId}, ${transactionData.jenis_paket}, ${transactionData.email}, ${transactionData.timestamp_dimulai}, ${transactionData.timestamp_berakhir}, ${transactionData.metode_bayar}, ${transactionData.nominal}
                     )
        `;

        // Check if the user is already in the PREMIUM table
        const existingPremiumUser = await sql`
            SELECT email FROM PREMIUM WHERE email = ${transactionData.email}
        `;

        // If the user is not in the PREMIUM table, insert them
        if (existingPremiumUser.rowCount === 0) { // Use rowCount to check if no rows are returned
            await sql`
                INSERT INTO PREMIUM (email)
                VALUES (${transactionData.email})
            `;
        }
    } catch (error) {
        console.error("Failed to save transaction and update premium status:", error);
        throw error;
    }
};
