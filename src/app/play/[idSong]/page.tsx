"use client"

import { HiArrowLeft, HiDownload, HiOutlinePlus } from "react-icons/hi";
import { PiPlay } from "react-icons/pi";

const PlaySong: React.FC = () => {

    const handleBack = () => {

    }

    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-5">
            <div className="flex w-full items-start flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-end">
                        <text className="text-4xl font-semibold">Ultraviolence</text>
                        <text>by Lana del Rey</text>
                    </div>

                    <div className="flex flex-row gap-2 text-marmut-000">
                        <div className="bg-marmut-green-500 px-[10px] py-1 rounded-2xl">Pop</div>
                        <div className="bg-marmut-green-500 px-[10px] py-1 rounded-2xl">Alternative/Indie</div>
                    </div>
                </div>

                <div>
                    <div className="flex gap-2">
                        <text className="font-semibold">Songwriter(s):</text>
                        <text>Lana, del, Rey</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Durasi:</text>
                        <text>3 menit</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Tanggal Rilis:</text>
                        <text>20/02/2023</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Tahun:</text>
                        <text>2023</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Total Play:</text>
                        <text>306</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Total Downloads:</text>
                        <text>78</text>
                    </div>

                    <div className="flex gap-2">
                        <text className="font-semibold">Album:</text>
                        <text>Ultraviolence</text>
                    </div>
                </div>

                <button className="bg-red-600 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={() => handleBack()}>
                    <HiArrowLeft />
                    <text>Back</text>
                </button>
            </div>

            <main className="flex flex-col w-full justify-center items-center gap-2">
                <input type="range" className="w-[60%] accent-marmut-dark-green-700"/>

                <div className="flex flex-row gap-2 items-center">
                    <div>
                        <button className="bg-marmut-dark-green-300 rounded-full p-2 text-marmut-000">
                            <HiOutlinePlus size={20} />
                        </button>
                    </div>
                 
                    <button className="bg-marmut-dark-green-300 rounded-full p-3 text-marmut-000">
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