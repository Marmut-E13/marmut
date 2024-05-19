"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPodcastsByPodcaster } from "@/actions/getPodcastsByPodcaster";
import { useAuth } from "@/contexts";

const PodcasterDashboard: React.FC = () => {
    const router = useRouter();
    const { username, isAuthenticated } = useAuth(); // Menggunakan email dari useAuth
    const [podcasts, setPodcasts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                if (isAuthenticated && username) {
                    const fetchedPodcasts = await getPodcastsByPodcaster(username); // Menggunakan email saat memanggil fungsi getPodcastsByPodcaster
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
    }, [isAuthenticated, username]);

    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-bold mb-4">DAFTAR PODCAST</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {podcasts.map((podcast, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-2">{podcast.title}</h2>
                        <p className="mb-2">{podcast.description}</p>
                        <p className="mb-2">Tanggal Rilis: {podcast.releaseDate}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Dengarkan Podcast
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcasterDashboard;
