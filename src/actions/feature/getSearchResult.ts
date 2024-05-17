"use server"

import { sql, QueryResultRow } from "@vercel/postgres";

interface SearchResult {
    type: string;
    title: string;
    by: string;
}

export const getSearchResult = async (query: string): Promise<SearchResult[]> => {
    try {
        const { rows: songRows } = await sql`
            SELECT 'SONG' AS type, k.judul AS title, a.nama AS by
            FROM SONG s
            INNER JOIN KONTEN k ON s.id_konten = k.id
            INNER JOIN ARTIST art ON s.id_artist = art.id
            INNER JOIN AKUN a ON art.email_akun = a.email
            WHERE k.judul ILIKE ${'%' + query + '%'}
        `;

        const { rows: podcastRows } = await sql`
            SELECT 'PODCAST' AS type, k.judul AS title, a.nama AS by
            FROM PODCAST p
            INNER JOIN KONTEN k ON p.id_konten = k.id
            INNER JOIN PODCASTER pod ON p.email_podcaster = pod.email
            INNER JOIN AKUN a ON pod.email = a.email
            WHERE k.judul ILIKE ${'%' + query + '%'}
        `;

        const { rows: playlistRows } = await sql`
            SELECT 'USER PLAYLIST' AS type, up.judul AS title, a.nama AS by
            FROM USER_PLAYLIST up
            INNER JOIN AKUN a ON up.email_pembuat = a.email
            WHERE up.judul ILIKE ${'%' + query + '%'}
        `;

        const results: SearchResult[] = [
            ...songRows,
            ...podcastRows,
            ...playlistRows,
        ].map((row: QueryResultRow) => ({
            type: row.type,
            title: row.title,
            by: row.by,
        }));

        return results;
    } catch (error) {
        console.error("Failed to search content:", error);
        throw error;
    }
};
