import { HiOutlineX } from "react-icons/hi"
import { Dropdown } from "../dropdown";
import { useEffect, useState } from "react";
import { getAllSong } from "@/actions/song";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    primaryButtonCallback: (id: string) => void
    error: string
}

export const SongModal: React.FC<ModalProps> = ({
    isOpen, onClose, primaryButtonCallback, error
}) => {
    const [options, setOptions] = useState<{display: string, value: string}[]>([{display: "", value: "a"}])
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const handleGetAllSong = async() => {
        const res = await getAllSong();

        const formattedOptions = res?.map(song => ({
            display: song.judul,
            value: song.id
        }));

        setOptions(formattedOptions as any);



    }

    useEffect(() => {
        handleGetAllSong();
    }, [])

    return (
        <div className={`fixed z-[999] top-0 left-0 w-full h-full flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="flex flex-col w-[40%] gap-1 bg-marmut-000 rounded-xl p-6">
                <div className="flex justify-end">
                    <button className="hover:bg-marmut-100 hover:text-marmut-600 p-2 rounded-[6px] text-[22px]" onClick={onClose}>
                        <HiOutlineX />
                    </button>
                </div>

                <main className="flex flex-col gap-3 px-[45px] pb-2">
                    <div className="flex justify-center">
                        <text className="text-2xl font-semibold">ADD SONG</text>
                    </div>


                    <div className="flex flex-col gap-[2px]">
                        <text className="font-semibold">Song</text>
                        <Dropdown
                            dropdownValue={dropdownValue}
                            setDropdownValue={setDropdownValue}
                            options={options}
                        />

                        {error && <text className="text-danger-100">{error}</text>}
                    </div>

                    <button className="mt-3 bg-marmut-dark-green-300 text-marmut-000 flex flex-row justify-center py-2 px-3 items-center rounded-md" onClick={() => primaryButtonCallback(dropdownValue)}>
                        Add
                    </button>
                </main>
            </div>
        </div>
    )
}