"use server";

import { sql } from "@vercel/postgres";

export const deleteDownloadedSong = async (title: string) => {
    try {
        await sql`
            DELETE FROM DOWNLOADED_SONG
            WHERE id_song = (
                SELECT s.id_konten
                FROM SONG s
                         INNER JOIN KONTEN k ON s.id_konten = k.id
                WHERE k.title = ${title}
            )
        `;
    } catch (error) {
        console.error("Failed to delete downloaded song:", error);
        throw error;
    }
};
