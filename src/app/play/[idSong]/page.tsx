"use client"

import { getArtistNameById } from "@/actions/artist";
import { getGenre } from "@/actions/genre";
import { getKontenById } from "@/actions/konten";
import { addAkunPlaySong } from "@/actions/play";
import { addPlaylistSong, getPlaylistById } from "@/actions/playlist";
import { addDownloadedSong, getSongById } from "@/actions/song";
import { getSongwriterBySongId } from "@/actions/songwriter";
import { AddSongModal, FailedModal, SuccessModal } from "@/components";
// import { SongProps } from "@/app/playlist/[idPlaylist]/page";
import { useAuth } from "@/contexts";
import { format, isValid } from "date-fns";
// import { KontenProps } from "@/types/playlist";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiDownload, HiOutlinePlus } from "react-icons/hi";
import { PiPlay } from "react-icons/pi";
import { useDisclosure } from "react-use-disclosure";

interface KontenProps {
    id: string;
    judul: string;
    tanggal_rilis: Date;
    tahun: number;
    durasi: number;
}

interface ArtistProps {
    id: string;
    email_akun: string;
    id_pemilik_hak_cipta: string;
}

interface AlbumProps {
    id: string;
    judul: string;
    jumlah_lagu: number;
    id_label: string;
    total_durasi: number;
}

export interface SongProps {
    konten: KontenProps;
    artist: ArtistProps;
    album: AlbumProps;
    total_play: number;
    total_download: number;
}

const PlaySong = ({params}: {params: {idSong: string}}) => {
    const router = useRouter();

    const { email, role } = useAuth();

    // const { role } = useAuth();
    const [song, setSong] = useState<SongProps>({} as any);
    const [genre, setGenre] = useState<{genre: string}[]>([]);
    const [songwriter, setSongwriter] = useState<{songwriter_name: string}[]>([]);
    const [rangeValue, setRangeValue] = useState(0);
    const [idPlaylist, setIdPlaylist] = useState<string>('');
    const [playlistName, setPlaylistName] = useState<string>('');
    const [tipe, setTipe] = useState<string>('');

    const [artis, setArtis] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(true);

    

    const handleBack = () => {
        router.back();
    }

    const handleGetGenre = async () => {
        const res = await getGenre(params.idSong);
        setGenre(res as any);

    }

    const handleGetSongwriter = async () => {
        const res = await getSongwriterBySongId(params.idSong);
        setSongwriter(res as any);
    }

    const handleGetArtist = async () => {
        const artistRes = await getArtistNameById(song.artist?.id);
        setArtis(artistRes as any);

        setIsLoading(false);

    }

    useEffect(() => {
        const getSong = async () => {
            setIsLoading(true);
            try {
                const songData = await getSongById(params.idSong);
                
                setSong(songData as any);
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        };

        getSong();
        handleGetGenre();
        
    }, [params.idSong]);

    const addSongModal = useDisclosure(false);
    // const downloadSongModal = useDisclosure(false);
    const SuccessModall = useDisclosure(false);
    const failModal = useDisclosure(false);
    
    const handleAddSong = async(idPlaylist: string) => {
        try {
            setIdPlaylist(idPlaylist);
            const res = await addPlaylistSong(params.idSong, email, idPlaylist);

            setTipe("playlist")

            if (res?.error) {
                addSongModal.close();
                failModal.open();

            } else {
                // console.log("ke sini");
                addSongModal.close();
                SuccessModall.open();
            }

        } catch (error) {
        }

    }

    const handleDownloadSong = async() => {
        try {
            setIdPlaylist(idPlaylist);
            const res = await addDownloadedSong(params.idSong, email);

            // console.log("ke sini dongg")
            setTipe("download")

            if (res?.error) {
                console.log("ga sini")
                // do.close();
                failModal.open();

            } else {
                // console.log("ke sini");
                SuccessModall.open();
            }

        } catch (error) {
        }
    }

    const handleAddUserPlaySong = async() => {
        if (rangeValue > 70) {
            try {
                await addAkunPlaySong(email, params.idSong);

                console.log("ke sini")

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }

    useEffect(() => {
        handleGetArtist();
        handleGetSongwriter();
    }, [song])

    const handleSuccessAdd = () => {
        router.push(`/playlist/${idPlaylist}`)
    }

    // const handleFailedAdd = () => {
    //     router.push(`/playlist/${idPlaylist}`)
    // }

    const handleGetPlaylistName = async() => {
        try {
            const res = await getPlaylistById(idPlaylist);
            setPlaylistName(res![0].judul)
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetPlaylistName()
    }, [idPlaylist])
    
    return (
        isLoading ? 
        <div className="flex justify-center flex-col py-[120px] gap-5 items-center h-screen w-full">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div> 
        </div>
        :
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-5">
            <AddSongModal 
                isOpen={addSongModal.isOpen}
                onClose={addSongModal.close}
                primaryButtonCallback={handleAddSong}
            />

            <SuccessModal
                isOpen={SuccessModall.isOpen}
                onClose={SuccessModall.close}
                primaryButtonCallback={tipe == "playlist" ? handleSuccessAdd : () => router.push('/feature/downloaded-song')}
                judul={song?.konten?.judul}
                idPlaylist={idPlaylist}
                playlist={playlistName}
                tipe={tipe}
            />

            <FailedModal
                isOpen={failModal.isOpen}
                onClose={failModal.close}
                primaryButtonCallback={tipe == "playlist" ? handleSuccessAdd : () => router.push('/feature/downloaded-song')}
                judul={song?.konten?.judul}
                idPlaylist={idPlaylist}
                playlist={playlistName}
                tipe={tipe}
            />

            <div className="flex w-full items-start flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-end">
                        <text className="text-4xl font-semibold">{song?.konten?.judul}</text>
                        <text>by {artis}</text>
                    </div>

                    <div className="flex flex-row gap-2 text-marmut-000">
                        {genre.map((props, key) => (
                            <div className="bg-marmut-green-500 px-[10px] py-1 rounded-2xl" key={key}>{props.genre}</div>
                        ))}
                        
                    </div>
                </div>

                <div>
                    <div className="flex gap-2">
                        <text className="font-semibold">Songwriter(s):</text>
                        {songwriter.map((props, key) => (
                            <text key={key}>{props.songwriter_name}</text>
                        ))}
                          
                    </div>

                    <div className="flex flex-row gap-2">
                        <span className="font-semibold">Durasi:</span>
                        {(() => {
                            const totalDurasi = song?.konten?.durasi;
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

                    <div className="flex gap-2">
                        <text className="font-semibold">Tanggal Rilis:</text>
                        <text>{format(isValid(song.konten?.tanggal_rilis) ?  new Date(song.konten.tanggal_rilis) : new Date(), 'dd/MM/yyyy')}</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Tahun:</text>
                        <text>{song.konten?.tahun}</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Total Play:</text>
                        <text>{song.total_play}</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Total Downloads:</text>
                        <text>{song.total_download}</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Album:</text>
                        <text>{song.album?.judul}</text>
                    </div>
                </div>

                <button className="bg-red-600 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={() => handleBack()}>
                    <HiArrowLeft />
                    <text>Back</text>
                </button>
            </div>

            <main className="flex flex-col w-full justify-center items-center gap-2">
                <input type="range" className="w-[60%] accent-marmut-dark-green-700" value={rangeValue} onChange={(e) => setRangeValue(parseInt(e.target.value))}/>

                <div className="flex flex-row gap-2 items-center">
                    <div>
                        <button className="bg-marmut-dark-green-300 rounded-full p-2 text-marmut-000" onClick={addSongModal.open}>
                            <HiOutlinePlus size={20} />
                        </button>
                    </div>
                 
                    <button className="bg-marmut-dark-green-300 rounded-full p-3 text-marmut-000" onClick={handleAddUserPlaySong}>
                        <PiPlay size={25}/>
                    </button>

                    <div>
                        <button className="bg-marmut-dark-green-300 rounded-full p-2 text-marmut-000 disabled:bg-slate-500 disabled:cursor-not-allowed" onClick={handleDownloadSong} disabled={!role.includes("premium")}>
                            <HiDownload size={20} />
                        </button>
                    </div>
 
                </div>
            </main>
        </div>
    )
}

export default PlaySong;