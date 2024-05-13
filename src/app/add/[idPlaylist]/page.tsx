"use client"

import { Dropdown } from "@/components/dropdown";
import { useState } from "react";

const AddPlaylist: React.FC = () => {
    const [dropdownValue, setDropdownValue] = useState<string>('a')
    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
            <text className="text-2xl font-semibold">Berhasil mengunduh Lagu dengan judul ‘Song1’!</text>
{/* 
            Judul: Song1s
            Artist: Artist1 */}

            {/* <div>
                Playlist:
                <Dropdown
                            dropdownValue={dropdownValue}
                            setDropdownValue={setDropdownValue}
                            options={[{display: 'Shades of cool - Lana del Rey', value: 'b'}, {display: 'Tomerrow never came - Lana del Rey', value: 'c'}]}
                        />
            </div> */}

            <div className="flex flex-row gap-2 text-marmut-000">
                <button className="bg-marmut-green-200">ke daftar download</button>
                <button className="bg-red-500">kembali</button>
            </div>
        </div>
    )
}

export default AddPlaylist;