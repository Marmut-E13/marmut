"use client";

import React, { useEffect, useState } from "react";
import { getUserPlaylists, PlaylistData } from "@/actions/getUserPlaylist";
import { useAuth } from "@/contexts"; // Pastikan jalur yang benar

export const UserDashboard: React.FC = () => {
    const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
    const { email, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            try {
                if (isAuthenticated && email) {
                    const userPlaylists = await getUserPlaylists(email);
                    setPlaylists(userPlaylists);
                }
            } catch (error) {
                console.error("Failed to fetch user playlists:", error);
            }
        };

        fetchUserPlaylists();
    }, [isAuthenticated, email]);

    if (!playlists.length) {
        return <text>Belum Memiliki Playlist</text>;
    }

    return (
        <div>
            <h2>Daftar Playlist</h2>
            <ul>
                {playlists.map((playlist, index) => (
                    <li key={index}>
                        <h3>{playlist.title}</h3>
                        <text>{playlist.description}</text>
                        <text>Jumlah Lagu: {playlist.songCount}</text>
                        <text>Total Durasi: {playlist.totalDuration} menit</text>
                        <text>Tanggal Dibuat: {playlist.creationDate}</text>
                    </li>
                ))}
            </ul>
        </div>
    );
};
