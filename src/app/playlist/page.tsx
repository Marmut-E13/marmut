"use client"

import { addPlaylist, deletePlaylist, getPlaylist } from "@/actions/playlist";
import { PlaylistModal, PlaylistRow } from "@/components";
import { useAuth } from "@/contexts";
import { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";

export interface UserPlaylistProps {
    email_pembuat: string;
    id_user_playlist: string;
    judul: string;
    deskripsi: string;
    jumlah_lagu: number;
    tanggal_dibuat: Date;
    id_playlist: string;
    total_durasi: number;
}

const Playlist: React.FC = () => {
    const { email } = useAuth();

    const { isOpen, open, close } = useDisclosure(false);
    const [userPlaylist, setUserPlaylist] = useState<UserPlaylistProps[]>([])

    const handleGetPlaylist = async(email: string) => {
        try{
            const res = await getPlaylist(email);
            setUserPlaylist(res as UserPlaylistProps[]);
        } catch (error) {

        }
    }

    

    const handleAddPlaylist = async(formData: FormData) => {
        try{
            await addPlaylist(formData, email);
            handleGetPlaylist(email);
            close();

        } catch (error) {

        }
    }

    const handleRemovePlaylist = async(idUserPlaylist: string) => {
        try {
            await deletePlaylist(idUserPlaylist, email);
            handleGetPlaylist(email);
            
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetPlaylist(email);
    }, [email])

    console.log(userPlaylist);

    return (
        userPlaylist.length == 0 ? 

        <div className="flex justify-center flex-col gap-5 items-center h-full w-full">
            <div>
                <text className="text-2xl font-bold text-center">TIDAK ADA USER PLAYLIST</text>
                <text className="italic text-marmut-600">Anda tidak memiliki playlist, tambahkan playlist melalui tombol di bawah :D</text>
            </div>

            <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={open}>
                <HiOutlinePlusSm size={23}/>
                <text>Tambah playlist</text>
            </button>
        </div> 
        :
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
            <PlaylistModal 
                isOpen={isOpen}
                onClose={close}
                primaryButtonCallback={handleAddPlaylist}
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
                    {userPlaylist.map((props, key) => (
                        <PlaylistRow key={key} data={props} handleRemovePlaylist={handleRemovePlaylist}/>
                    ))}
                </div>
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