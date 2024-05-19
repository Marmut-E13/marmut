
"use client";

import React, { useEffect, useState } from "react";
import { getAlbumsByLabel, AlbumData } from "@/actions/getAlbumsByLabel";
import { useAuth } from "@/contexts";

const LabelDashboard: React.FC = () => {
    const { email, isAuthenticated } = useAuth();
    const [albums, setAlbums] = useState<AlbumData[]>([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                if (isAuthenticated && email) {
                    const fetchedAlbums = await getAlbumsByLabel(email);
                    setAlbums(fetchedAlbums);
                }
            } catch (error) {
                console.error("Failed to fetch albums:", error);
            }
        };

        if (isAuthenticated) {
            fetchAlbums();
        }
    }, [isAuthenticated, email]);

    return (
        <div>
            <h2>Daftar Album</h2>
            {albums.length === 0 ? (
                <text>Belum Memproduksi Album</text>
            ) : (
                <div>
                    {albums.map((album, index) => (
                        <div key={index}>
                            <h3>{album.title}</h3>
                            <text>Jumlah Lagu: {album.numberOfSongs}</text>
                            <text>Total Durasi: {album.totalDuration} menit</text>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LabelDashboard;
