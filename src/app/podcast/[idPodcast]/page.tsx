"use client"

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPodcastDetails } from '@/actions/podcast/getPodcastById'
import { format, isValid } from 'date-fns';
import { getEpisodeByPodcastId } from '@/actions/podcast/getEpisodeByPodcastId';
import { getSumEpisodeDuration } from '@/actions/podcast/getSumEpisodeDuration';

interface PodcastDetailsProps {
    judul: string;
    genre: string;
    nama: string;
    tanggal_rilis: Date;
    tahun: number;
}
  

interface PodcastEpisodeProps {
    id_episode: string;
    judul: string;
    deskripsi: string;
    durasi: number;
    tanggal_rilis: Date;
}

interface totalEpisodeDurationProps {
    sum: number;
}

const Podcast = ({params}: {params: {idPodcast: string}}) => {

    const [podcastDetails, setPodcastDetails] = useState<PodcastDetailsProps>({} as any);

    const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisodeProps[]>([]);

    const[totalEpisodesDuration, setTotalEpisodesDuration] = useState<totalEpisodeDurationProps>({} as any);

    const handleGetPodcastDetails = async (idPodcast: string) => {
        try {
            const res = await getPodcastDetails(idPodcast);
            setPodcastDetails(res![0] as any);

        } catch (error) {
            
        }
    }

    const handleGetPodcastEpisodes = async (idPodcast: string) => {
        try {
            const res = await getEpisodeByPodcastId(idPodcast);
            setPodcastEpisodes(res as PodcastEpisodeProps[]);

        } catch (error) {

        }
    }

    const handleGetEpisodeDurationSum = async (idPodcast: string) => {
        try {
            const res = await getSumEpisodeDuration(idPodcast);
            setTotalEpisodesDuration(res![0] as any);

        } catch (error) {

        }
    }




    useEffect(() => {
        handleGetPodcastDetails(params.idPodcast);
        handleGetPodcastEpisodes(params.idPodcast);
        handleGetEpisodeDurationSum(params.idPodcast);
    }, [params]);


    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                <title>{podcastDetails.judul}</title>
                </Head>
                <h1 className="mb-4 text-xl font-bold">{podcastDetails.judul}</h1>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <p><strong>Genre:</strong> {podcastDetails.genre}</p>
                        <p><strong>Podcaster:</strong> {podcastDetails.nama}</p>
                        {totalEpisodesDuration.sum > 60 ? (
                            <p><strong>Total Duration:</strong> {Math.floor(totalEpisodesDuration.sum / 60)} Jam {totalEpisodesDuration.sum % 60} Menit</p>
                        ) : (
                            <p><strong>Total Duration:</strong> {totalEpisodesDuration.sum} Menit</p>
                        )}     
                    </div>
                    <div className="col-md-6">
                        <p><strong>Release Date:</strong> {format(isValid(podcastDetails.tanggal_rilis) ?  new Date(podcastDetails.tanggal_rilis) : new Date(), 'dd/MM/yy')}</p>
                        <p><strong>Year:</strong> {podcastDetails.tahun}</p>
                    </div>
                </div>

                <div className="mb-6 mt-6">
                <Link className="text-white bg-marmut-green-600 p-3 rounded-xl" href="/podcast">
                    back to podcast
                </Link>
                </div>

                <h3 className="mb-2 text-xl font-bold">Podcast Episodes</h3>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}> 
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                        <thead className="thead-dark">
                            <tr>
                            <th className="col-3" scope="col">Episode Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {podcastEpisodes.map((episode, index) => (
                            <tr key={index} id={episode.judul.toLowerCase().replace(/\s/g, '-')}>
                                <td>{episode.judul}</td>
                                <td>{episode.deskripsi}</td>
                                { episode.durasi > 60 ? (
                                    <td>{Math.floor(episode.durasi / 60)} Jam {episode.durasi % 60} Menit</td>
                                ) : (
                                    <td>{episode.durasi} menit</td>
                                )}
                                <td>{format(isValid(episode.tanggal_rilis) ?  new Date(episode.tanggal_rilis) : new Date(), 'dd/MM/yy')}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Podcast;