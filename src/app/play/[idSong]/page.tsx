"use client"

import { getArtistNameById } from "@/actions/artist";
import { getGenre } from "@/actions/genre";
import { getKontenById } from "@/actions/konten";
import { addAkunPlaySong } from "@/actions/play";
import { getSongById } from "@/actions/song";
import { getSongwriterBySongId } from "@/actions/songwriter";
// import { SongProps } from "@/app/playlist/[idPlaylist]/page";
import { useAuth } from "@/contexts";
import { format, isValid } from "date-fns";
// import { KontenProps } from "@/types/playlist";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiDownload, HiOutlinePlus } from "react-icons/hi";
import { PiPlay } from "react-icons/pi";

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

    const { email } = useAuth();

    const { role } = useAuth();
    const [song, setSong] = useState<SongProps>({} as any);
    const [genre, setGenre] = useState<{genre: string}[]>([]);
    const [songwriter, setSongwriter] = useState<{songwriter_name: string}[]>([]);
    const [rangeValue, setRangeValue] = useState(0);

    const [artis, setArtis] = useState<string>('');

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
        setArtis(artistRes as any)
    }

    useEffect(() => {
        const getSong = async () => {
            try {
                const songData = await getSongById(params.idSong);
                
                setSong(songData as any);
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        };

        getSong();
        handleGetGenre();
        // handleGetArtist(song.artist.email_akun);
        
    }, [params.idSong]);

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
    
    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-5">
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

                    <div className="flex gap-2">
                        <text className="font-semibold">Durasi:</text>
                        <text>{(song.konten?.durasi / 60).toFixed(2)} menit</text>
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
                        <button className="bg-marmut-dark-green-300 rounded-full p-2 text-marmut-000">
                            <HiOutlinePlus size={20} />
                        </button>
                    </div>
                 
                    <button className="bg-marmut-dark-green-300 rounded-full p-3 text-marmut-000" onClick={handleAddUserPlaySong}>
                        <PiPlay size={25}/>
                    </button>

                    <div>
                        <button className="bg-marmut-dark-green-300 rounded-full p-2 text-marmut-000">
                            <HiDownload size={20} />
                        </button>
                    </div>
 
                </div>
            </main>
        </div>
    )
}

export default PlaySong;