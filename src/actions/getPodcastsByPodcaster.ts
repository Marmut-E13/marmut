"use server";

import { sql } from "@vercel/postgres";

export interface PodcastData {
    id: string;
    title: string;
    description: string;
    releaseDate: string;
    podcasterEmail: string;
}

export const getPodcastsByPodcaster = async (email: string): Promise<PodcastData[]> => {
    try {
        const { rows } = await sql`
            SELECT
                KONTEN.id AS id,
                KONTEN.judul AS title,
                EPISODE.deskripsi AS description,
                TO_CHAR(KONTEN.tanggal_rilis, 'YYYY-MM-DD') AS releaseDate, -- Format the date string
                PODCASTER.email AS podcasterEmail
            FROM
                PODCAST
                    INNER JOIN
                KONTEN ON PODCAST.id_konten = KONTEN.id
                    INNER JOIN
                PODCASTER ON PODCAST.email_podcaster = PODCASTER.email
                    INNER JOIN
                EPISODE ON PODCAST.id_konten = EPISODE.id_konten_podcast
            WHERE
                PODCASTER.email = ${email};
        `;

        console.log("Fetched rows:", rows);

        const podcasts: PodcastData[] = rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            releaseDate: row.releaseDate, // Keep the date string as is
            podcasterEmail: row.podcasterEmail
        }));

        console.log("Mapped podcasts:", podcasts);

        return podcasts;
    } catch (error) {
        console.error("Failed to fetch podcasts:", error);
        throw error;
    }
};
