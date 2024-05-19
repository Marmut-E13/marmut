"use client"

import React, { useEffect, useState } from "react";
import { getSongs, SongData } from "@/actions/getSongs";
import { useAuth } from "@/contexts";

export const ArtistDashboard: React.FC = () => {
    const [songs, setSongs] = useState<SongData[]>([]);
    const { email, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (isAuthenticated && email) {
                    // Memanggil getSongs dengan peran pengguna sebagai "artist"
                    const artistSongs = await getSongs(email, "artist");
                    setSongs(artistSongs);
                }
            } catch (error) {
                console.error("Failed to fetch songs:", error);
            }
        };

        fetchSongs();
    }, [isAuthenticated, email]);

    return (
        <div className="py-6">
            <h2 className="text-2xl font-semibold mb-4">Daftar Lagu (Artis)</h2>
            {songs.length === 0 ? (
                <p>Belum Ada Lagu yang Dibuat</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {songs.map((song, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">{song.title}</h3>
                            <p className="text-sm mb-2">Tanggal Rilis: {song.releaseDate}</p>
                            <p className="text-sm">Durasi: {song.duration} menit</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtistDashboard;
