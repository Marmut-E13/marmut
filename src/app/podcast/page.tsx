"use client"

import Head from 'next/head';
import Link from 'next/link';

interface PodcastDetails {
    title: string;
    genre: string;
    podcaster: string;
    totalDuration: string;
    releaseDate: string;
    year: number;
}
  
interface PodcastEpisode {
    title: string;
    description: string;
    duration: string;
    releaseDate: string;
}

const Podcast: React.FC = () => {
    // Dummy data for podcast details and episodes
    const podcastDetails: PodcastDetails = {
        title: 'Tech RN',
        genre: 'Technology',
        podcaster: 'John Smith',
        totalDuration: '1h 15m',
        releaseDate: '2024-04-30',
        year: 2024,
    };

    const podcastEpisodes: PodcastEpisode[] = [
        {
        title: 'Episode 1: Introduction to the Podcast',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        duration: '30m',
        releaseDate: '2024-04-30',
        },
        {
        title: 'Episode 2: Deep Dive into Technology Trends',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        duration: '45m',
        releaseDate: '2024-05-01',
        },
    ];

    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                <title>{podcastDetails.title}</title>
                </Head>
                <h1 className="mb-4 text-xl font-bold">{podcastDetails.title}</h1>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <p><strong>Genre:</strong> {podcastDetails.genre}</p>
                        <p><strong>Podcaster:</strong> {podcastDetails.podcaster}</p>
                        <p><strong>Total Duration:</strong> {podcastDetails.totalDuration}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Release Date:</strong> {podcastDetails.releaseDate}</p>
                        <p><strong>Year:</strong> {podcastDetails.year}</p>
                    </div>
                </div>

                <h3 className="mb-2 text-xl font-bold">Podcast Episodes</h3>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Episode Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Release Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {podcastEpisodes.map((episode, index) => (
                        <tr key={index} id={episode.title.toLowerCase().replace(/\s/g, '-')}>
                            <td>{episode.title}</td>
                            <td>{episode.description}</td>
                            <td>{episode.duration}</td>
                            <td>{episode.releaseDate}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <div className="mb-4">
                <Link href="/dashboard">
                    <button className="btn btn-primary">Back to Dashboard</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Podcast;