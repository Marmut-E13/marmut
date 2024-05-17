"use client"

import { addPlaylistSong, getPlaylist, getPlaylistById, getPlaylistSong } from "@/actions/playlist";
import { SongModal, SongRow } from "@/components";
import { useAuth } from "@/contexts";
import { KontenProps, UserPlaylistProps } from "@/types/playlist";
import { format, isValid } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiOutlinePlusSm } from "react-icons/hi";
import { LuShuffle } from "react-icons/lu";
import { useDisclosure } from "react-use-disclosure";

export interface SongProps {
    id_konten: string;
    id_artist: string;
    id_album: string;
    total_play: number;
    total_download: number;
}

const PlaylistDetail = ({params}: {params: {idPlaylist: string}}) => {
    const router = useRouter();
    const pathname = usePathname();

    const { email } = useAuth();

    const [songs, setSongs] = useState<SongProps[]>([]);
    const [userPlaylist, setUserPlaylist] = useState<UserPlaylistProps>({} as any);
    const { isOpen, open, close } = useDisclosure(false);
    const [ error, setError ] = useState<string>('');

    const handleBack = () => {
        router.back()
    }

    const handleGetPlaylistSong = async (id: string) => {
        try{
            const res = await getPlaylistSong(id);
            setSongs(res as SongProps[]);

        } catch(error){

        }
    }

    const handleGetPlaylist = async(idPlaylist: string) => {
        try{
            const res = await getPlaylistById(idPlaylist);
            setUserPlaylist(res![0] as any)
        } catch (error) {

        }
    }

    const handleAddPlaylistSong = async(idSong: string) => {
        try {
            const res = await addPlaylistSong(idSong, email, params.idPlaylist);

            if (res?.error) {
                setError(res.error);
                console.log("gabole ke sini");
            } else {
                console.log("ke sini");
                close();
                setError('');
                setSongs(prevSongs => [...prevSongs, res?.song]);
            }

        } catch (error) {
        }
    };
    

    useEffect(() => {
        handleGetPlaylistSong(params.idPlaylist);
        handleGetPlaylist(params.idPlaylist);
    }, [email, params])


    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
            <SongModal 
                isOpen={isOpen}
                onClose={close}
                primaryButtonCallback={handleAddPlaylistSong}
                error={error}
            />

            <div className="flex flex-col w-full items-start gap-3">
                <div className="flex flex-col">
                    <text className="text-4xl font-semibold">{userPlaylist.judul}</text>
                    <text>by: lanatics</text>
                </div>

                <div>
                    <div className="flex flex-row gap-[10px]">
                        <text className="font-semibold">Jumlah Lagu:</text>
                        <text>{userPlaylist.jumlah_lagu}</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Total Durasi:</text>
                        <text className="mr-[1px]">{(userPlaylist.total_durasi / 60).toFixed(2)}</text>
                        <text>menit</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Tanggal Dibuat:</text>
                        <text>{format(isValid(userPlaylist.tanggal_dibuat) ?  new Date(userPlaylist.tanggal_dibuat) : new Date(), 'dd/MM/yyyy')}</text>
                    </div>
                </div>

                <div>
                    <text className="text-marmut-400 font-semibold">
                        {userPlaylist.deskripsi}
                    </text>
                </div>

                <div className="flex flex-row gap-2">
                    <button className="bg-red-600 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={() => handleBack()}>
                        <HiArrowLeft />
                        <text>Back</text>
                    </button>

                    <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md">
                        <LuShuffle size={20}/>
                        <text>Shuffle play</text>
                    </button>
                </div>
            </div>

            <main className="flex flex-col gap-[10px] w-full">
                <div className="grid grid-cols-6 px-[10px]">
                    <div className="col-span-2 flex-row items-center px-2">
                        <text className="font-semibold text-[18px]">Judul Lagu</text>
                    </div>

                    <div className="col-span-2 flex-row items-center px-2">
                        <text className="font-semibold text-[18px]">Oleh</text>
                    </div>

                    <div className="col-span-1 flex-row items-center px-2">
                        <text className="font-semibold text-[18px]">Durasi</text>
                    </div>

                    <div className="col-span-1 flex-row items-center px-2 text-center">
                        <text className="font-semibold text-[18px]">Actions</text>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    {songs.map((props, key) => (
                        <SongRow key={key} data={props}/>
                    ))}
                </div>
            </main>

            <div>
                <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={open}>
                    <HiOutlinePlusSm size={23}/>
                    <text>Tambah Lagu</text>
                </button>
            </div>
        </div>

    )
}

export default PlaylistDetail;