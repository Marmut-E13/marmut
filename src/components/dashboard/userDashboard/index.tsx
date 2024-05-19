"use client";

import React, { useEffect, useState } from "react";
import { getUserPlaylists, PlaylistData } from "@/actions/getUserPlaylist";
import { useAuth } from "@/contexts"; // Pastikan jalur yang benar

export const UserDashboard: React.FC = () => {
    const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
    const { username, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            try {
                if (isAuthenticated && username) {
                    const userPlaylists = await getUserPlaylists(username);
                    setPlaylists(userPlaylists);
                }
            } catch (error) {
                console.error("Failed to fetch user playlists:", error);
            }
        };

        fetchUserPlaylists();
    }, [isAuthenticated, username]);

    if (!playlists.length) {
        return <p>Belum Memiliki Playlist</p>;
    }

    return (
        <div>
            <h2>Daftar Playlist</h2>
            <ul>
                {playlists.map((playlist, index) => (
                    <li key={index}>
                        <h3>{playlist.title}</h3>
                        <p>{playlist.description}</p>
                        <p>Jumlah Lagu: {playlist.songCount}</p>
                        <p>Total Durasi: {playlist.totalDuration} detik</p>
                        <p>Tanggal Dibuat: {playlist.creationDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
