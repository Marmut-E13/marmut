"use client"

import { getAllPodcast } from "@/actions/podcast/getAllPodcast";
import { PlaylistModal, PlaylistRow } from "@/components";
import { UUID } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface podcastProps {
    judul: string;
    id_konten: UUID;
}


const ListPodcast: React.FC = () => {


    const [podcastList, setPodcastList] = useState<podcastProps[]>([]);

    const handleGetPodcastList = async () => {
        try {
            const res = await getAllPodcast();

            setPodcastList(res as podcastProps[]);

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
                                {podcastList.map((podcastProps, index) => (
                                <tr key={index} id={podcastProps.id_konten}>
                                    <Link href={`/podcast/${podcastProps.id_konten}`}>
                                        <td>{podcastProps.judul}</td>
                                    </Link>

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