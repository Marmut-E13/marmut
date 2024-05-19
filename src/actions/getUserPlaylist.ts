"use server";

import { sql } from "@vercel/postgres";

export interface PlaylistData {
    title: string;
    description: string;
    songCount: number;
    totalDuration: number;
    creationDate: string;
}

export const getUserPlaylists = async (email: string): Promise<PlaylistData[]> => {
    try {
        const { rows } = await sql`
            SELECT up.judul AS "title", up.deskripsi AS "description", up.jumlah_lagu AS "songCount", 
                   up.total_durasi AS "totalDuration", up.tanggal_dibuat AS "creationDate"
            FROM USER_PLAYLIST up
            WHERE up.email_pembuat = ${email}
        `;

        console.log("Fetched rows:", rows);

        const userPlaylists: PlaylistData[] = rows.map(row => ({
            title: row.title,
            description: row.description,
            songCount: row.songCount,
            totalDuration: row.totalDuration,
            creationDate: new Date(row.creationDate).toLocaleDateString()
        }));

        console.log("Mapped userPlaylists:", userPlaylists);

        return userPlaylists;
    } catch (error) {
        console.error("Failed to fetch user playlists:", error);
        throw error;
    }
};
