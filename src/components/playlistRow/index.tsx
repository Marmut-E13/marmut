"use client"

import { deletePlaylist } from "@/actions/playlist";
import { useAuth } from "@/contexts";
import { UserPlaylistProps } from "@/types/playlist";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineInformationCircle, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

interface PlaylistRowProps {
    data: UserPlaylistProps
    handleRemovePlaylist: (idUserPlaylist: string) => void;
}

export const PlaylistRow: React.FC<PlaylistRowProps> = ({
    data, handleRemovePlaylist
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const { email } = useAuth();

    const handleInfo = (idUserplaylist: string) => {
        router.push(`${pathname}/${idUserplaylist}`)
    }

    return (
        <div className="grid grid-cols-6 w-full bg-marmut-green-400 p-3 hover:bg-marmut-green-600 text-marmut-000 font-medium rounded-md text-[18px] items-center">
            <div className="col-span-2 flex-row items-center px-2">
                <text>{data.judul}</text>
            </div>

            <div className="col-span-1 flex-row items-center px-2">
                <text>{data.jumlah_lagu}</text>
            </div>

            <div className="col-span-2 flex flex-row items-center gap-1 px-2">
                <text>{(data.total_durasi / 60).toFixed(2)}</text>
                <text>menit</text>
            </div>

            <div className="col-span-1 flex-row items-center flex gap-[7px] justify-center ">
                <button className="bg-marmut-700 text-marmut-100 p-[7px] rounded-md" onClick={() => handleInfo(data.id_playlist)}>
                    <HiOutlineInformationCircle size={23}/>
                </button>

                <button className="bg-marmut-brown-500 text-marmut-light-brown-000 p-[7px] rounded-md">
                    <HiOutlinePencilAlt size={23}/>
                </button>

                <button className="bg-red-600 text-red-100 p-[7px] rounded-md" onClick={() => handleRemovePlaylist(data.id_user_playlist)}>
                    <HiOutlineTrash size={23}/>
                </button>
            </div>
        </div>
    )
}