"use server";

import { sql } from "@vercel/postgres";

export interface SongData {
    title: string;
    releaseDate: string;
    duration: number;
}

export const getSongsByArtist = async (email: string): Promise<SongData[]> => {
    try {
        const { rows } = await sql`
            SELECT k.judul AS "title", k.tanggal_rilis AS "releaseDate", k.durasi AS "duration"
            FROM SONG s
            INNER JOIN ARTIST a ON s.id_artist = a.id
            INNER JOIN KONTEN k ON s.id_konten = k.id
            WHERE a.email_akun = ${email}
        `;

        console.log("Fetched artist songs:", rows);

        const songs: SongData[] = rows.map(row => ({
            title: row.title,
            releaseDate: new Date(row.releaseDate).toLocaleDateString(),
            duration: row.duration
        }));

        console.log("Mapped artist songs:", songs);

        return songs;
    } catch (error) {
        console.error("Failed to fetch songs by artist:", error);
        throw error;
    }
};

export const getSongsBySongwriter = async (email: string): Promise<SongData[]> => {
    try {
        const { rows } = await sql`
            SELECT k.judul AS "title", k.tanggal_rilis AS "releaseDate", k.durasi AS "duration"
            FROM SONGWRITER_WRITE_SONG sws
            INNER JOIN SONG s ON sws.id_song = s.id_konten
            INNER JOIN SONGWRITER sw ON sws.id_songwriter = sw.id
            INNER JOIN KONTEN k ON s.id_konten = k.id
            WHERE sw.email_akun = ${email}
        `;

        console.log("Fetched songwriter songs:", rows);

        const songs: SongData[] = rows.map(row => ({
            title: row.title,
            releaseDate: new Date(row.releaseDate).toLocaleDateString(),
            duration: row.duration
        }));

        console.log("Mapped songwriter songs:", songs);

        return songs;
    } catch (error) {
        console.error("Failed to fetch songs by songwriter:", error);
        throw error;
    }
};

export const getSongs = async (email: string, role: string): Promise<SongData[]> => {
    try {
        if (role === "artist") {
            return getSongsByArtist(email);
        } else if (role === "songwriter") {
            return getSongsBySongwriter(email);
        } else {
            throw new Error("Invalid role");
        }
    } catch (error) {
        console.error("Failed to fetch songs:", error);
        throw error;
    }
};
