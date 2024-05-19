"use client"

import { getChartById } from '@/actions/chart/getChartById';
import { getChartSongByChartId } from '@/actions/chart/getChartSongByChartId';
import { format,isValid } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ChartProps {
    tipe: string;
    id_playlist: string;
    // Add more properties as needed
}

interface ChartSongProps {
    id_konten: string;
    judul: string;
    nama: string;
    tanggal_rilis: string;
    total_play: number;
    // Add more properties as needed
  }

const Details = ({params}: {params: {idChart: string}}) => {
    const router = useRouter();

    const [chartSongList, setChartSongList] = useState<ChartSongProps[]>([]);
    const [chartType, setChartType] = useState<ChartProps>({} as any);
    
    const handleGetChartSongList = async () => {
        try {
            const res = await getChartSongByChartId();

            setChartSongList(res as ChartSongProps[]);

        } catch (error) {

        }
    };

    const handleGetChartType = async (idChart: string) => {
        try {
            const res = await getChartById(idChart);
            setChartType(res![0] as any);

        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        handleGetChartSongList();
        handleGetChartType(params.idChart);
    }, []);

    // Dummy data for songs in the chart
    
    
    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                    <title>{chartType.tipe} Details</title>
                </Head>
                <h1>{chartType.tipe} Details</h1>

                <h2 className="mt-4">Song Lists</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Song Title</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Total Play</th>
                        <th scope="col">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {chartSongList.map((song) => (
                        <tr key={song.id_konten}>
                        <td>{song.judul}</td>
                        <td>{song.nama}</td>
                        <td>{format(isValid(song.tanggal_rilis) ?  new Date(song.tanggal_rilis) : new Date(), 'dd/MM/yy')}</td>
                        <td>{song.total_play}</td>
                        <td>
                            <Link href={`/play/${song.id_konten}`}>
                                    <p className='text-primary'><u>details</u></p>
                            </Link>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Details;