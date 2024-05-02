"use client"

import Head from 'next/head';
import { useRouter } from 'next/navigation';

interface Chart {
    id: string;
    type: string;
    // Add more properties as needed
}

interface Song {
    id: string;
    title: string;
    artist: string;
    releaseDate: string;
    totalPlay: number;
    // Add more properties as needed
  }

const Details: React.FC = () => {
    const router = useRouter();

    const chart: Chart = {
        id: 'caaa6fd4-404c-422f-8137-3a89d6b08807',
        type: 'top 20 weeks'
    };

    // Dummy data for songs in the chart
    const songs: Song[] = [
        {
        id: '1',
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: '2024-01-01',
        totalPlay: 100,
        },
        {
        id: '2',
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: '2024-02-01',
        totalPlay: 200,
        },
    ];

    const sortedSongs = [...songs].sort((a, b) => b.totalPlay - a.totalPlay);
    
    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                    <title>{chart.type} Details</title>
                </Head>
                <h1>{chart.type} Details</h1>

                <h2 className="mt-4">Top Songs</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Song Title</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Total Play</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedSongs.slice(0, 20).map((song) => (
                        <tr key={song.id}>
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                        <td>{song.releaseDate}</td>
                        <td>{song.totalPlay}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Details;