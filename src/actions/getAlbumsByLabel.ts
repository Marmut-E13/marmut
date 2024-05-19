"use server";

import { sql } from "@vercel/postgres";

export interface AlbumData {
    id: string;
    title: string;
    numberOfSongs: number;
    totalDuration: number;
}

export const getAlbumsByLabel = async (email: string): Promise<AlbumData[]> => {
    try {
        const { rows } = await sql`
            SELECT 
                ALBUM.id,
                ALBUM.judul AS title,
                ALBUM.jumlah_lagu AS "numberOfSongs",
                ALBUM.total_durasi AS "totalDuration"
            FROM 
                ALBUM
            INNER JOIN 
                LABEL ON ALBUM.id_label = LABEL.id
            WHERE 
                LABEL.email = ${email};
        `;

        console.log("Fetched albums:", rows);

        const albums: AlbumData[] = rows.map(row => ({
            id: row.id,
            title: row.title,
            numberOfSongs: parseInt(row.numberOfSongs) || 0,
            totalDuration: parseInt(row.totalDuration) || 0
        }));

        console.log("Mapped albums:", albums);

        return albums;
    } catch (error) {
        console.error("Failed to fetch albums:", error);
        throw error;
    }
};

