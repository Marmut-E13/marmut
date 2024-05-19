"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPodcastsByPodcaster } from "@/actions/getPodcastsByPodcaster";
import { useAuth } from "@/contexts";

const PodcasterDashboard: React.FC = () => {
    const router = useRouter();
    const { email, isAuthenticated } = useAuth(); // Using email from useAuth
    const [podcasts, setPodcasts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                if (isAuthenticated && email) {
                    const fetchedPodcasts = await getPodcastsByPodcaster(email); // Using email when calling getPodcastsByPodcaster
                    console.log("Fetched podcasts:", fetchedPodcasts);
                    setPodcasts(fetchedPodcasts);
                }
            } catch (error) {
                console.error("Failed to fetch podcasts:", error);
            }
        };

        if (isAuthenticated) {
            fetchPodcasts();
        }
    }, [isAuthenticated, email]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <div className="container mx-auto px-8 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Daftar Podcast</h1>
            {podcasts.length === 0 ? (
                <p className="text-center text-gray-600">Belum Memiliki Podcast</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Judul Podcast</th>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Deskripsi</th>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Tanggal Rilis</th>
                            <th className="py-3 px-6 border-b-2 border-gray-300 text-left leading-tight">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {podcasts.map((podcast, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-4 px-6 border-b border-gray-300">{podcast.title}</td>
                                <td className="py-4 px-6 border-b border-gray-300">{podcast.description}</td>
                                <td className="py-4 px-6 border-b border-gray-300">{formatDate(podcast.releaseDate)}</td>
                                <td className="py-4 px-6 border-b border-gray-300">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => router.push(`/podcasts/${podcast.id}`)}
                                    >
                                        Dengarkan Podcast
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PodcasterDashboard;
