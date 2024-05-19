// SongwriterDashboard.tsx

"use client";

import React, { useEffect, useState } from "react";
import { getSongs, SongData } from "@/actions/getSongs";
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
        return <div className="text-center mt-4 text-gray-500">Belum Memiliki Lagu</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Daftar Lagu (Songwriter)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {songs.map((song, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                        <p className="text-gray-600">Tanggal Rilis: {song.releaseDate}</p>
                        <p className="text-gray-600">Durasi: {song.duration} menit</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongwriterDashboard;
