// SongwriterDashboard.tsx

"use client";

import React, { useEffect, useState } from "react";
import {getSongs, SongData} from "@/actions/getSongs";
import { useAuth } from "@/contexts";

export const SongwriterDashboard: React.FC = () => {
    const [songs, setSongs] = useState<SongData[]>([]);
    const { username, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (isAuthenticated && username) {
                    // Memanggil getSongs dengan peran pengguna sebagai "songwriter"
                    const songwriterSongs = await getSongs(username, "songwriter");
                    setSongs(songwriterSongs);
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
            <h2>Daftar Lagu (Songwriter)</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>
                        <h3>{song.title}</h3>
                        <p>Tanggal Rilis: {song.releaseDate}</p>
                        <p>Durasi: {song.duration} detik</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongwriterDashboard