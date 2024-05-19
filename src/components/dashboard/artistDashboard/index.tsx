"use client";

import React, { useEffect, useState } from "react";
import {getSongs, SongData} from "@/actions/getSongs";
import { useAuth } from "@/contexts";

export const ArtistDashboard: React.FC = () => {
    const [songs, setSongs] = useState<SongData[]>([]);
    const { username, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (isAuthenticated && username) {
                    // Memanggil getSongs dengan peran pengguna sebagai "artist"
                    const artistSongs = await getSongs(username, "artist");
                    setSongs(artistSongs);
                }
            } catch (error) {
                console.error("Failed to fetch songs:", error);
            }
        };

        fetchSongs();
    }, [isAuthenticated, username]);

    if (!songs.length) {
        return <p>Belum Memiliki Lagu</p>;
    }

    return (
        <div>
            <h2>Daftar Lagu (Artis)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {songs.map((song, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                        <p>Tanggal Rilis: {song.releaseDate}</p>
                        <p>Durasi: {song.duration} detik</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtistDashboard