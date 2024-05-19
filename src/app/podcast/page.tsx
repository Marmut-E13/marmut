"use client"

import { getAllPodcast } from "@/actions/podcast/getAllPodcast";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface PodcastProps {
    judul: string;
    id_konten: string;
}


const ListPodcast: React.FC = () => {


    const [podcastList, setPodcastList] = useState<PodcastProps[]>([]);

    const handleGetPodcastList = async () => {
        try {
            const res = await getAllPodcast();

            setPodcastList(res as PodcastProps[]);

        } catch (error) {
            console.error("Failed to fetch podcast:", error);
        }
    };

    
  
    useEffect(() => {
        handleGetPodcastList();
    }, []);

    return (
            <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
                <span className="flex text-2xl font-bold">Podcast</span>
                <main className="flex flex-col gap-[10px] w-full">
                    <div className="grid grid-cols-6 px-3">
                        <div className="col-span-3 flex-row px-2">
                            <span className="font-semibold text-[18px]">List Of Podcast</span>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Podcast Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podcastList.map((PodcastProps, index) => (
                                <tr key={index} id={PodcastProps.id_konten}>
                                   <td> 
                                        <Link href={`/podcast/${PodcastProps.id_konten}`}>
                                            {PodcastProps.judul}
                                        </Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        
    );
};

export default ListPodcast;