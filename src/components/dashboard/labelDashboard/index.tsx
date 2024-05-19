"use client";

import React, { useEffect, useState } from "react";
import { getAlbumsByLabel, AlbumData } from "@/actions/getAlbumsByLabel";
import { useAuth } from "@/contexts";

const LabelDashboard: React.FC = () => {
    const { username, isAuthenticated } = useAuth();
    const [albums, setAlbums] = useState<AlbumData[]>([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                if (isAuthenticated && username) {
                    const fetchedAlbums = await getAlbumsByLabel(username);
                    setAlbums(fetchedAlbums);
                }
            } catch (error) {
                console.error("Failed to fetch albums:", error);
            }
        };

        if (isAuthenticated) {
            fetchAlbums();
        }
    }, [isAuthenticated, username]);

    return (
        <div>
            <h2>Daftar Album</h2>
            {albums.length === 0 ? (
                <p>Belum Memproduksi Album</p>
            ) : (
                <div>
                    {albums.map((album, index) => (
                        <div key={index}>
                            <h3>{album.title}</h3>
                            <p>Jumlah Lagu: {album.numberOfSongs}</p>
                            <p>Total Durasi: {album.totalDuration} detik</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LabelDashboard;
