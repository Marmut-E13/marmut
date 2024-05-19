"use server"

import { sql } from "@vercel/postgres";

export interface PodcastData {
    id: string;
    title: string;
    releaseDate: string;
    podcasterEmail: string;
}

export const getPodcastsByPodcaster = async (email: string): Promise<PodcastData[]> => {
    try {
        const { rows } = await sql`
            SELECT 
                KONTEN.id AS id,
                KONTEN.judul AS title,
                KONTEN.tanggal_rilis AS releaseDate,
                PODCASTER.email AS podcasterEmail
            FROM 
                PODCAST
            INNER JOIN 
                KONTEN ON PODCAST.id_konten = KONTEN.id
            INNER JOIN 
                PODCASTER ON PODCAST.email_podcaster = PODCASTER.email
            WHERE 
                PODCASTER.email = ${email};
        `;

        console.log("Fetched rows:", rows);

        const podcasts: PodcastData[] = rows.map(row => ({
            id: row.id,
            title: row.title,
            releaseDate: new Date(row.releaseDate).toLocaleDateString(),
            podcasterEmail: row.podcasterEmail
        }));

        console.log("Mapped podcasts:", podcasts);

        return podcasts;
    } catch (error) {
        console.error("Failed to fetch podcasts:", error);
        throw error;
    }
};
