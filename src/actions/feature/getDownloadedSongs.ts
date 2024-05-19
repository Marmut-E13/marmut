"use server";

import { sql } from "@vercel/postgres";

interface DownloadedSongData {
    title: string;
    artistName: string;
    releaseDate: string;
}

export const getDownloadedSongs = async (email: string): Promise<DownloadedSongData[]> => {
    try {
        const { rows } = await sql`
            SELECT k.judul AS "title", a.nama AS "artistName", k.tanggal_rilis AS "releaseDate"
            FROM DOWNLOADED_SONG ds
                     INNER JOIN SONG s ON ds.id_song = s.id_konten
                     INNER JOIN KONTEN k ON s.id_konten = k.id
                     INNER JOIN ARTIST art ON s.id_artist = art.id
                     INNER JOIN AKUN a ON art.email_akun = a.email
            WHERE ds.email_downloader = ${email}
        `;

        console.log("Fetched rows:", rows); // Log the fetched rows

        const downloadedSongs: DownloadedSongData[] = rows.map(row => ({
            title: row.title,
            artistName: row.artistName,
            releaseDate: new Date(row.releaseDate).toLocaleDateString() // Format the date
        }));

        console.log("Mapped downloadedSongs:", downloadedSongs); // Log the mapped data

        return downloadedSongs;
    } catch (error) {
        console.error("Failed to fetch downloaded songs:", error);
        throw error;
    }
};
