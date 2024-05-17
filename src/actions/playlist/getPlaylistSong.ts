"use server"

import { sql } from "@vercel/postgres";

export const getPlaylistSong = async(idPlaylist: string) => {
    try{
        const { rows } = await sql`
            SELECT SONG.*
            FROM PLAYLIST_SONG
            JOIN SONG ON PLAYLIST_SONG.id_song = SONG.id_konten
            WHERE PLAYLIST_SONG.id_playlist = ${idPlaylist}
        `;

        return rows;

    } catch(error) {

    }
}