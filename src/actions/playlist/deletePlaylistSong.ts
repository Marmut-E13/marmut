"use server"

import { sql } from "@vercel/postgres";

export const deletePlaylistSong = async (idPlaylist: string, idSong: string) => {

    console.log(idPlaylist);
    console.log(idSong);

    try{
        await sql`
            DELETE FROM PLAYLIST_SONG
            WHERE id_playlist=${idPlaylist} AND id_song=${idSong};
        `;
    } catch (error) {
        console.log("Error: ", error)
    }
}