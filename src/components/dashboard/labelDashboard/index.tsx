"use client";

import { useState, useEffect } from "react";
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
        <div className="container mx-auto px-8 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Daftar Album</h1>
            {albums.length === 0 ? (
                <p className="text-center text-gray-600">Belum Memproduksi Album</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Judul Album</th>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Jumlah Lagu</th>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Total Durasi (menit)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {albums.map((album, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-4 px-6 border-b border-gray-300">{album.title}</td>
                                <td className="py-4 px-6 border-b border-gray-300">{album.numberOfSongs}</td>
                                <td className="py-4 px-6 border-b border-gray-300">{album.totalDuration}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LabelDashboard;
