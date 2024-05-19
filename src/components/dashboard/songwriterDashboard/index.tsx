// SongwriterDashboard.tsx

"use client";

import React, { useEffect, useState } from "react";
import {getSongs, SongData} from "@/actions/getSongs";
import { useAuth } from "@/contexts";

export const SongwriterDashboard: React.FC = () => {
    const [songs, setSongs] = useState<SongData[]>([]);
    const { email, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (isAuthenticated && email) {
                    // Memanggil getSongs dengan peran pengguna sebagai "songwriter"
                    const songwriterSongs = await getSongs(email, "songwriter");
                    setSongs(songwriterSongs);
                }
            } catch (error) {
                console.error("Failed to fetch songs:", error);
            }
        };

        fetchSongs();
    }, [isAuthenticated, email]);

    if (!songs.length) {
        return <text>Belum Memiliki Lagu</text>;
    }

    return (
        <div>
            <h2>Daftar Lagu (Songwriter)</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>
                        <h3>{song.title}</h3>
                        <text>Tanggal Rilis: {song.releaseDate}</text>
                        <text>Durasi: {song.duration} menit</text>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongwriterDashboard