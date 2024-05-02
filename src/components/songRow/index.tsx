"use client"

import { KontenProps, SongProps } from "@/types/playlist";
import { usePathname, useRouter } from "next/navigation";
import { FiPlay } from "react-icons/fi";
import { HiOutlineEye, HiOutlineInformationCircle, HiOutlinePencilAlt, HiOutlinePlay, HiOutlineTrash } from "react-icons/hi";
import { PiPlay } from "react-icons/pi";

interface SongRowProps {
    data: SongProps
}

export const SongRow: React.FC<SongRowProps> = ({
    data
}) => {

    const router = useRouter()
    const pathname = usePathname()

    const handlePlay = () => {
        router.push('/play/dummy')
    }

    const dummyKontens: KontenProps[] = [
        {
          id: "1",
          judul: "Ultraviolence",
          tanggal_rilis: new Date(2018, 3, 20),
          tahun: 2024,
          durasi: 180,
        },
        {
          id: "2",
          judul: "Blue Jeans",
          tanggal_rilis: new Date(2023, 8, 4),
          tahun: 2024,
          durasi: 240,
        },
    ];

    return (
        <div className="grid grid-cols-6 w-full bg-marmut-green-400 p-[10px] hover:bg-marmut-green-600 text-marmut-000 font-medium rounded-md items-center">
            <div className="col-span-2 flex-row items-center px-2">
                <text>Ultaviolence</text>
            </div>

            <div className="col-span-2 flex-row items-center px-2">
                <text>Lana del Rey</text>
            </div>

            <div className="col-span-1 flex flex-row items-center gap-1 px-2">
                <text>3</text>
                <text>menit</text>
            </div>

            <div className="col-span-1 flex-row items-center px-2 flex gap-[6px] justify-center">
                <button className="bg-marmut-700 text-marmut-100 p-[7px] rounded-md">
                    <HiOutlineInformationCircle size={21}/> 
                </button>

                <button className="bg-marmut-brown-500 text-marmut-light-brown-000 p-[7px] rounded-md" onClick={() => handlePlay()}>
                    <PiPlay size={19}/>
                </button>

                {/* <button className="bg-red-600 text-red-100 p-[7px] rounded-md">
                    <HiOutlineTrash size={21}/>
                </button> */}
            </div>
        </div>
    )
}