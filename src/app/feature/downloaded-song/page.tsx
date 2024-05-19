"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDownloadedSongs } from "@/actions/feature/getDownloadedSongs";
import { deleteDownloadedSong } from "@/actions/feature/deleteDownloadedSong";
import { useAuth } from "@/contexts"; // Pastikan lokasi useAuth benar

const DownloadedSongs: React.FC = () => {
    const router = useRouter();
    const { email, isAuthenticated } = useAuth(); // Menggunakan email dari useAuth
    const [downloadedSongs, setDownloadedSongs] = useState<any[]>([]);

    useEffect(() => {
        const fetchDownloadedSongs = async () => {
            try {
                if (isAuthenticated && email) {
                    const songs = await getDownloadedSongs(email); // Gunakan email saat memanggil fungsi getDownloadedSongs
                    console.log("Fetched downloaded songs:", songs);
                    setDownloadedSongs(songs);
                }
            } catch (error) {
                console.error("Failed to fetch downloaded songs:", error);
            }
        };

        if (isAuthenticated) {
            fetchDownloadedSongs();
        }
    }, [isAuthenticated, email]);

    const handleDeleteSong = async (title: string) => {
        try {
            await deleteDownloadedSong(title);
            const updatedSongs = downloadedSongs.filter(song => song.title !== title);
            setDownloadedSongs(updatedSongs);
            alert(`Berhasil menghapus Lagu dengan judul '${title}' dari daftar unduhan!`);
        } catch (error) {
            console.error("Failed to delete downloaded song:", error);
        }
    };

    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-bold mb-4">DAFTAR LAGU</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-marmut-green-600 text-white">
                        <th className="p-3">Judul Lagu</th>
                        <th className="p-3">Nama Artis</th>
                        <th className="p-3">Tanggal Rilis</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {downloadedSongs.map((song, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className="p-3">{song.title}</td>
                            <td className="p-3">{song.artistName}</td>
                            <td className="p-3">{song.releaseDate}</td>
                            <td className="p-3">
                                <button onClick={() => router.push(`/songs/${song.title}`)} className="bg-marmut-green-600 text-white py-1 px-2 rounded-md mr-2">Lihat</button>
                                <button onClick={() => handleDeleteSong(song.title)} className="bg-red-600 text-white py-1 px-2 rounded-md">Hapus</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => router.back()} className="bg-marmut-green-600 text-white py-2 px-4 rounded-md mt-4">Kembali</button>
        </div>
    );
};

export default DownloadedSongs;
