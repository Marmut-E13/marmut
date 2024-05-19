"use client"

import { useRouter } from "next/navigation";
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from "@/contexts";
import { getAllPodcasterPodcast } from "@/actions/podcast/manage/getAllPodcasterPodcast";
import { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { deletePodcast } from "@/actions/podcast/manage/deletePodcast";


interface PodcasterPodcastProps {
    id_konten: string;
    judul: string;
    total_episode: number;
    durasi: number;
}

const ManagePodcast: React.FC = () => {
    const { email } = useAuth();
    
    const router = useRouter();

    const [podcasterPodcastList, setPodcasterPodcastList] = useState<PodcasterPodcastProps[]>([]);

    const handleGetPodcastList = async (email: string) => {
        try {
            const res = await getAllPodcasterPodcast(email);

            setPodcasterPodcastList(res as PodcasterPodcastProps[]);

        } catch (error) {

        }
    };

    const handleRemovePodcast = async (idPodcast: string) => {
        try {
            await deletePodcast(idPodcast);
            handleGetPodcastList(email);

        } catch (error) {

        }
    }


    useEffect(() => {
        handleGetPodcastList(email);
    }, [email]);
    

    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                    <title>Chart List</title>
                </Head>
                <h1 className='my-2 font-bold text-xl'>Podcast List</h1>
                { podcasterPodcastList.length === 0 ? (
                    <div>
                        <p className="text-2xl font-bold text-center">TIDAK ADA PODCAST</p>
                        <p className="italic text-marmut-600 text-center">Anda belum memiliki podcast, tambahkan podcast melalui tombol dibawah</p>
                    </div>
                ) :
                (
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
                        {podcasterPodcastList.map((podcasterPodcast) => (
                            <tr key={podcasterPodcast.id_konten}>
                            <td>
                                <p>{podcasterPodcast.judul}</p>
                            </td>
                            <td>
                                <p>{podcasterPodcast.total_episode}</p>
                            </td>
                            { podcasterPodcast.durasi > 60 ? (
                                <td>{Math.floor(podcasterPodcast.durasi / 60)} Jam {podcasterPodcast.durasi % 60} Menit</td>
                            ) : (
                                <td>
                                <p>{podcasterPodcast.durasi} Menit</p>
                                </td>
                            )}
                            <td>
                                <Link href={`/manage/podcast/details?id_konten=${podcasterPodcast.id_konten}`}>
                                    <p className='text-primary'><u>lihat daftar episode</u></p>
                                </Link>
                                <Link href={`/manage/podcast/create/podcast-episode?id_konten=${podcasterPodcast.id_konten}`}>
                                    <p className='text-marmut-green-500'><u>tambah episode</u></p>
                                </Link>
                                <Link href={`/manage/podcast/update?id_konten=${podcasterPodcast.id_konten}`}>
                                    <p className='text-warning'><u>edit podcast</u></p>
                                </Link>
                                <button className='text-danger' onClick={() => handleRemovePodcast(podcasterPodcast.id_konten)}><u>hapus</u></button>

                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
             
            </div>
            <Link href={`/manage/podcast/create`}>
                <div className="mx-24 mt-8 d-flex justify-content-center">
                    <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 ml-5 items-center rounded-md">
                        <HiOutlinePlusSm size={23} />
                        <text>Create Podcast</text>
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default ManagePodcast;