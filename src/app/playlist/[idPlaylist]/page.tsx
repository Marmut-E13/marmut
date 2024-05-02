"use client"

import { SongRow } from "@/components";
import { KontenProps, SongProps, UserPlaylistProps } from "@/types/playlist";
import { usePathname, useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { LuShuffle } from "react-icons/lu";

const PlaylistDetail: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleBack = () => {
        router.back()
    }

    const dummyData: UserPlaylistProps = {
        email_pembuat: "billie.eilish@gmail.com",
        id_user_playlist: "25a7d562-6053-4b8c-bff6-44ba23ed2bd2",
        judul: "Lana del slay",
        deskripsi: "all for our mother, lana del rey",
        jumlah_lagu: 54,
        tanggal_dibuat: new Date(2024, 3, 2),
        id_playlist: "dc65dec4-3a1d-422d-ac7f-077cdba41fd0",
        total_durasi: 9442
    }

    const dummySongs: SongProps[] = [
        {
          id_konten: "1",
          id_artist: "id-lana",
          id_album: "id-ultraviolence",
          total_play: 1000,
          total_download: 500,
        },
        {
          id_konten: "2",
          id_artist: "id-lana",
          id_album: "id-borntodie",
          total_play: 800,
          total_download: 300,
        },
    ];

    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
            {/* <text className="flex text-2xl font-bold">User Playlist Detail</text> */}

            <div className="flex flex-col w-full items-start gap-3">
                <div className="flex flex-col">
                    <text className="text-4xl font-semibold">{dummyData.judul}</text>
                    <text>by: lanatics</text>
                </div>

                <div>
                    <div className="flex flex-row gap-[10px]">
                        <text className="font-semibold">Jumlah Lagu:</text>
                        <text>{dummyData.jumlah_lagu}</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Total Durasi:</text>
                        {/* <text>{dummyData.total_durasi}</text> */}
                        <text>3 jam 12 menit</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Tanggal Dibuat:</text>
                        <text>20/04/2024</text>
                    </div>
                </div>

                <div>
                    <text className="text-marmut-400 font-semibold">
                        Every night I used to pray that I’d find my people,
                        and finally I did On the open road.
                        We had nothing to lose, nothing to gain, nothing we desired anymore,
                        except to make our lives into a work of art.
                        
                        Live fast,
                        Die young,
                        Be wild,
                        And have fun.
                        -Lana del ray
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
                <div className="grid grid-cols-6 px-3">
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
                    {dummySongs.map((props, key) => (
                        <SongRow key={key} data={props}/>
                    ))}
                </div>
            </main>
        </div>

    )
}

export default PlaylistDetail;