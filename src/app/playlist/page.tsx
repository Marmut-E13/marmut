"use client"

import { PlaylistModal, PlaylistRow } from "@/components";
import { UserPlaylistProps } from "@/types/playlist";
import { useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";

const Playlist: React.FC = () => {
    const { isOpen, open, close } = useDisclosure(false);


    const dummyData: UserPlaylistProps[] = [
        {
            email_pembuat: "billie.eilish@gmail.com",
            id_user_playlist: "25a7d562-6053-4b8c-bff6-44ba23ed2bd2",
            judul: "Lana del slay",
            deskripsi: "all for our mother, lana del rey",
            jumlah_lagu: 54,
            tanggal_dibuat: new Date(2024, 3, 2),
            id_playlist: "dc65dec4-3a1d-422d-ac7f-077cdba41fd0",
            total_durasi: 9442
        },
        {
            email_pembuat: "taylor.swift@gmail.com",
            id_user_playlist: "788091e7-578c-436a-8c4a-8e11445dc031",
            judul: "little thing called love",
            deskripsi: "some bucin songs",
            jumlah_lagu: 11,
            tanggal_dibuat: new Date(2024, 2, 20),
            id_playlist: "53f63988-0927-4b8a-9c01-d351a70efa1d",
            total_durasi: 1870
        }
    ];

    const getPlaylist = async () => {

    }

    useEffect(() => {

    }, [])

    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
            <PlaylistModal 
                isOpen={isOpen}
                onClose={close}
                primaryButtonCallback={() => {}}
            />

            <text className="flex text-2xl font-bold">User Playlist</text>

            <main className="flex flex-col gap-[10px] w-full">
                <div className="grid grid-cols-6 px-3">
                    <div className="col-span-2 flex-row items-center px-2">
                        <text className="font-semibold text-[18px]">Judul</text>
                    </div>

                    <div className="col-span-1 flex-row items-center px-2">
                        <text className="font-semibold text-[18px]">Jumlah Lagu</text>
                    </div>

                    <div className="col-span-2 flex-row items-center px-2">
                        <text className="font-semibold text-[18px]">Total Durasi</text>
                    </div>

                    <div className="col-span-1 flex-row items-center px-2 text-center">
                        <text className="font-semibold text-[18px]">Action</text>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    {dummyData.map((props, key) => (
                        <PlaylistRow key={key} data={props}/>
                    ))}
                </div>

                {/* <div className="text-center w-full justify-center flex">Maaf and belum memiliki playlist :(</div> */}
            </main>
            
            <div>
                <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={open}>
                    <HiOutlinePlusSm size={23}/>
                    <text>Tambah playlist</text>
                </button>
            </div>
        </div>
    )
}

export default Playlist;