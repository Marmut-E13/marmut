import { HiOutlineX } from "react-icons/hi"
import { Dropdown } from "../dropdown";
import { useEffect, useState } from "react";
import { getAllSong } from "@/actions/song";
import { getPlaylist } from "@/actions/playlist";
import { useAuth } from "@/contexts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    primaryButtonCallback: () => void
    judul: string
    playlist: string
    idPlaylist: string
    tipe: string
    // error: string
}

export const SuccessModal: React.FC<ModalProps> = ({
    isOpen, onClose, primaryButtonCallback, judul, playlist, tipe
}) => {
    // const [options, setOptions] = useState<{display: string, value: string}[]>([{display: "", value: "a"}])
    // const [dropdownValue, setDropdownValue] = useState<string>('');
    const { email } = useAuth();

    // const handleGetAllPlaylist = async() => {
    //     const res = await getPlaylist(email);

    //     const formattedOptions = res?.map(playlist => ({
    //         display: playlist.judul,
    //         value: playlist.id_playlist
    //     }));

    //     setOptions(formattedOptions as any);
    // }

    // useEffect(() => {
    //     handleGetAllPlaylist();
    // }, [email])

    return (
        <div className={`fixed z-[999] top-0 left-0 w-full h-full flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="flex flex-col w-[40%] gap-1 bg-marmut-000 rounded-xl p-6 items-center">
            <div className="flex flex-col items-center">
                    {tipe === "playlist" ? <text className="text-center">Berhasil menambahkan lagu dengan judul {judul} ke dalam {playlist}</text> : <text>Lagu dengan judul {judul} berhasil diunduh!</text>}

                    <div className='flex flex-row gap-3'>
                        <button className="mt-3 bg-marmut-dark-green-300 text-marmut-000 flex flex-row justify-center py-2 px-3 items-center rounded-md" onClick={primaryButtonCallback}>
                            {tipe === "playlist" ? <text>Ke playlist</text> : <text>Ke download</text>}
                        </button>

                        <button className="mt-3 bg-marmut-dark-green-300 text-marmut-000 flex flex-row justify-center py-2 px-3 items-center rounded-md" onClick={onClose}>
                            Kembali
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}