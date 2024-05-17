"use client"

import { deletePlaylist } from "@/actions/playlist";
import { useAuth } from "@/contexts";
import { UserPlaylistProps } from "@/types/playlist";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineInformationCircle, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { PlaylistModal } from "../playlistModal";
import { useDisclosure } from "react-use-disclosure";

interface PlaylistRowProps {
    data: UserPlaylistProps;
    handleRemovePlaylist: (idUserPlaylist: string) => void;
    handleEditPlaylist: (id: string, formData: FormData) => void;
}

export const PlaylistRow: React.FC<PlaylistRowProps> = ({
    data,
    handleRemovePlaylist,
    handleEditPlaylist
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { email } = useAuth();

    const handleInfo = (idUserplaylist: string) => {
        router.push(`${pathname}/${idUserplaylist}`);
    };

    const handleEdit = (formData: FormData) => {
        handleEditPlaylist(data.id_user_playlist, formData);
        close();
    };

    const { isOpen, open, close } = useDisclosure(false);

    return (
        <div className="grid grid-cols-6 w-full bg-marmut-green-400 p-3 hover:bg-marmut-green-600 text-marmut-000 font-medium rounded-md text-[18px] items-center">
            <PlaylistModal
                isOpen={isOpen}
                onClose={close}
                primaryButtonCallback={handleEdit}
                status={"EDIT"}
                value={{ judul: data.judul, deskripsi: data.deskripsi }}
            />

            <div className="col-span-2 flex-row items-center px-2">
                <span>{data.judul}</span>
            </div>

            <div className="col-span-1 flex-row items-center px-2">
                <span>{data.jumlah_lagu}</span>
            </div>

            <div className="col-span-2 flex flex-row items-center gap-1 px-2">
                <span>{(data.total_durasi / 60).toFixed(2)} menit</span>
            </div>

            <div className="col-span-1 flex-row items-center flex gap-[7px] justify-center ">
                <button className="bg-marmut-700 text-marmut-100 p-[7px] rounded-md" onClick={() => handleInfo(data.id_playlist)}>
                    <HiOutlineInformationCircle size={23} />
                </button>

                <button className="bg-marmut-brown-500 text-marmut-light-brown-000 p-[7px] rounded-md" onClick={open}>
                    <HiOutlinePencilAlt size={23} />
                </button>

                <button className="bg-red-600 text-red-100 p-[7px] rounded-md" onClick={() => handleRemovePlaylist(data.id_user_playlist)}>
                    <HiOutlineTrash size={23} />
                </button>
            </div>
        </div>
    );
};
