"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const DownloadedSongs: React.FC = () => {
    const router = useRouter();
    const [downloadedSongs, setDownloadedSongs] = useState<any[]>([
        {
            title: "Song1",
            artist: "Artist1",
            downloadDate: "20/02/2024"
        },
        {
            title: "Song2",
            artist: "Artist2",
            downloadDate: "21/02/2024"
        },
        {
            title: "Song3",
            artist: "Artist3",
            downloadDate: "22/02/2024"
        },
        {
            title: "Song4",
            artist: "Artist4",
            downloadDate: "23/02/2024"
        },
        {
            title: "Song5",
            artist: "Artist5",
            downloadDate: "24/02/2024"
        },
        {
            title: "Song6",
            artist: "Artist6",
            downloadDate: "25/02/2024"
        },

    ]);

    const handleViewSong = (title: string) => {
        router.push(`/songs/${title}`);
    };

    const handleDeleteSong = (title: string) => {
        const updatedSongs = downloadedSongs.filter(song => song.title !== title);
        setDownloadedSongs(updatedSongs);
        alert(`Berhasil menghapus Lagu dengan judul '${title}' dari daftar unduhan!`);
    };

    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-bold mb-4">DAFTAR LAGU</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-marmut-green-600 text-white">
                        <th className="p-3">Judul Lagu</th>
                        <th className="p-3">Oleh</th>
                        <th className="p-3">Tanggal Download</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {downloadedSongs.map((song, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className="p-3 bg-marmut-green-000">{song.title}</td>
                            <td className="p-3 bg-marmut-green-000">{song.artist}</td>
                            <td className="p-3 bg-marmut-green-000">{song.downloadDate}</td>
                            <td className="p-3 bg-marmut-green-000">
                                <button onClick={() => handleViewSong(song.title)} className="bg-marmut-green-600 text-white py-1 px-2 rounded-md mr-2">Lihat</button>
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
}

export default DownloadedSongs;
