"use client"

import { getAllSong } from "@/actions/play/getAllSong";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface SongProps {
    judul: string;
    id_konten: string;
}


const ListSong: React.FC = () => {


    const [songList, setSongList] = useState<SongProps[]>([]);

    const handleGetsongList = async () => {
        try {
            const res = await getAllSong();

            setSongList(res as SongProps[]);

        } catch (error) {
            console.error("Failed to fetch song:", error);
        }
    };



    useEffect(() => {
        handleGetsongList();
    }, []);

    return (
            <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
                <span className="flex text-2xl font-bold">Song</span>
                <main className="flex flex-col gap-[10px] w-full">
                    <div className="grid grid-cols-6 px-3">
                        <div className="col-span-3 flex-row px-2">
                            <span className="font-semibold text-[18px]">List Of Song</span>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Song Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songList.map((SongProps, index) => (
                                <tr key={index} id={SongProps.id_konten}>
                                   <td> 
                                        <Link href={`/play/${SongProps.id_konten}`}>
                                            {SongProps.judul}
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

export default ListSong;