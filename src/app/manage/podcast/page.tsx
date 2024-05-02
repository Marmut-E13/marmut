"use client"

import { usePathname, useRouter } from "next/navigation";
import Head from 'next/head';
import Link from 'next/link';


interface PodcastDetails {
    title: string;
    genre: string;
    totalEpisode: number;
    podcaster: string;
    totalDuration: string;
    releaseDate: string;
    year: number;
}

const ManagePodcast: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleBack = () => {
        router.back()
    }

    // Dummy data for podcast details and episodes
    const podcastDetails: PodcastDetails[] = [
        {
            title: 'Tech RN',
            genre: 'Technology',
            podcaster: 'John Smith',
            totalEpisode: 2,
            totalDuration: '1h 15m',
            releaseDate: '2024-04-30',
            year: 2024,
        },
        {
            title: 'Spotify Ads',
            genre: 'Music',
            podcaster: 'Desta',
            totalEpisode: 10,
            totalDuration: '1h',
            releaseDate: '2022-04-30',
            year: 2022,
        },
    ]

    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                    <title>Chart List</title>
                </Head>
                <h1 className='my-2 font-bold text-xl'>Podcast List</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Judul</th>
                        <th scope="col">Total Episode</th>
                        <th scope="col">Total Durasi</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {podcastDetails.map((podcast) => (
                        <tr key={podcast.title}>
                        <td>
                            <p>{podcast.title}</p>
                        </td>
                        <td>
                            <p>{podcast.totalEpisode}</p>
                        </td>
                        <td>
                            <p>{podcast.totalDuration}</p>
                        </td>
                        <td>
                            <Link href={`/chart/${podcast.title}`}>
                                <p className='text-primary'><u>details</u></p>
                            </Link>
                            <p className='text-danger'><u>delete</u></p>
                            <p className='text-warning'><u>update</u></p>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mx-24">
                <Link href="/create/podcast">
                    <button className="btn btn-primary">Create Podcast</button>
                </Link>
            </div>
        </div>
    )
}

export default ManagePodcast;