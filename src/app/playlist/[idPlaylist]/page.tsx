"use client"

import { addAkunPlaySong } from "@/actions/play";
import { addAkunPlayPlaylist, addPlaylistSong, deletePlaylistSong, getPlaylist, getPlaylistById, getPlaylistSong } from "@/actions/playlist";
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
    const { email } = useAuth();

    const [songs, setSongs] = useState<SongProps[]>([]);
    const [userPlaylist, setUserPlaylist] = useState<UserPlaylistProps>({} as any);
    const { isOpen, open, close } = useDisclosure(false);
    const [ error, setError ] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleBack = () => {
        router.back()
    }

    const handleGetPlaylistSong = async (id: string) => {
        try{
            
            const res = await getPlaylistSong(id);
            setSongs(res as SongProps[]);
            setIsLoading(false);
        } catch(error){
        }
    }

    const handleGetPlaylist = async(idPlaylist: string) => {
        try{
            setIsLoading(true);
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
            } else {
                close();
                setError('');
                // setSongs(prevSongs => [...prevSongs, res?.song]);
                // setUserPlaylist((oldUserPlaylist) => {
                //     const newUserPlaylist = { ...oldUserPlaylist };
                //     newUserPlaylist.jumlah_lagu = oldUserPlaylist.jumlah_lagu+1;
                //     newUserPlaylist.total_durasi= oldUserPlaylist.total_durasi+
                
                //     // Return the updated user playlist object
                //     return newUserPlaylist;
                // });
                handleGetPlaylist(params.idPlaylist);
                handleGetPlaylistSong(params.idPlaylist);
            }

        } catch (error) {
        }
    };

    const handleDeletePlaylistSong = async(idSong: string) => {
        await deletePlaylistSong(params.idPlaylist, idSong);
        // setSongs(prevSongs => prevSongs.filter(song => song.id_konten !== idSong));

        handleGetPlaylist(params.idPlaylist);
        handleGetPlaylistSong(params.idPlaylist);
    }

    const handleShufflePlay = async() => {
        try {
            const randomIndex = Math.floor(Math.random() * songs.length);
            const randomSong = songs[randomIndex];
            const idSong = randomSong.id_konten;
            await addAkunPlayPlaylist(email, userPlaylist.id_user_playlist, userPlaylist.email_pembuat);
            await addAkunPlaySong(email, idSong);
        } catch (error) {

        }
    }

    const handlePlay = async(idSong: string) => {
        try {
            await addAkunPlayPlaylist(email, userPlaylist.id_user_playlist, userPlaylist.email_pembuat);
            await addAkunPlaySong(email, idSong);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetPlaylist(params.idPlaylist);
        handleGetPlaylistSong(params.idPlaylist);
    }, [email, params])

    return (
        isLoading ? 
        <div className="flex justify-center flex-col py-[120px] gap-5 items-center h-screen w-full">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div> 
        </div>
        :
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
                    <text>by: {userPlaylist.email_pembuat}</text>
                </div>

                <div>
                    <div className="flex flex-row gap-[10px]">
                        <text className="font-semibold">Jumlah Lagu:</text>
                        <text>{userPlaylist.jumlah_lagu}</text>
                    </div>

                    <div className="flex flex-row gap-1">
                        <span className="font-semibold">Total Durasi:</span>
                        {(() => {
                            const totalDurasi = userPlaylist.total_durasi;
                            const hours = Math.floor(totalDurasi / 60);
                            const minutes = totalDurasi % 60;
                            return (
                                <>
                                    {hours > 0 && <span className="mr-[1px]">{hours} jam</span>}
                                    <span className="mr-[1px]">{minutes} menit</span>
                                </>
                            );
                        })()}
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

                    <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md disabled:bg-slate-500 disabled:cursor-not-allowed" onClick={handleShufflePlay} disabled={songs.length == 0}>
                        <LuShuffle size={20}/>
                        <text>Shuffle play</text>
                    </button>
                </div>
            </div>

            <main className="flex flex-col gap-[10px] w-full">
                {songs.length == 0 ? 
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-center">TIDAK ADA LAGU</span>
                        {email == userPlaylist.email_pembuat ? <span className="italic text-marmut-600">Anda tidak memiliki lagu, tambahkan lagu melalui tombol di bawah :D</span> : 
                        <span className="italic text-marmut-600">Playlist ini tidak ada lagunya, hubungi pemilik playlist untuk menambahkan lagu :(</span>}
                    </div>
                    : 
                    <>
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
                        <SongRow key={key} data={props} handleDeletePlaylistSong={handleDeletePlaylistSong} isOwner={email === userPlaylist.email_pembuat} handlePlaySong={handlePlay}/>
                    ))}
                </div></>}
            </main>

            <div>
                {email === userPlaylist.email_pembuat && <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={open}>
                    <HiOutlinePlusSm size={23}/>
                    <text>Tambah Lagu</text>
                </button>}
            </div>
        </div>

    )
}

export default PlaylistDetail;