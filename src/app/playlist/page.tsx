"use client"

import { addPlaylist, deletePlaylist, getPlaylist, updatePlaylist } from "@/actions/playlist";
import { PlaylistModal, PlaylistRow } from "@/components";
import { useAuth } from "@/contexts";
import { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";

export interface UserPlaylistProps {
    email_pembuat: string;
    id_user_playlist: string;
    judul: string;
    deskripsi: string;
    jumlah_lagu: number;
    tanggal_dibuat: Date;
    id_playlist: string;
    total_durasi: number;
}

const Playlist: React.FC = () => {
    const { email } = useAuth();

    const addPlaylistModal = useDisclosure(false);

    const [userPlaylist, setUserPlaylist] = useState<UserPlaylistProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleGetPlaylist = async (email: string) => {
        try {
            setIsLoading(true)
            const res = await getPlaylist(email);
            setUserPlaylist(res as UserPlaylistProps[]);
            setIsLoading(false);
        } catch (error) {

        }
    };

    const handleAddPlaylist = async (formData: FormData) => {
        try {
            await addPlaylist(formData, email);
            handleGetPlaylist(email);
            addPlaylistModal.close();
        } catch (error) {

        }
    };

    const handleEditPlaylist = async (id: string, formData: FormData) => {
        try {
            await updatePlaylist(email, id, formData);
            handleGetPlaylist(email);
            addPlaylistModal.close();
        } catch (error) {

        }
    };

    const handleRemovePlaylist = async (idUserPlaylist: string) => {
        try {
            await deletePlaylist(idUserPlaylist, email);
            handleGetPlaylist(email);
        } catch (error) {
            console.error("Failed to delete playlist:", error);
        }
    };

    useEffect(() => {
        handleGetPlaylist(email);
    }, [email]);

    return (
        isLoading ? 
        <div className="flex justify-center flex-col py-[120px] gap-5 items-center h-screen w-full">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div> 
        </div>

        :
        userPlaylist.length === 0 ? (
            <div className="flex justify-center flex-col py-[120px] gap-5 items-center h-screen w-full">
                <PlaylistModal
                    isOpen={addPlaylistModal.isOpen}
                    onClose={addPlaylistModal.close}
                    primaryButtonCallback={handleAddPlaylist}
                    status={"ADD"}
                />
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-center">TIDAK ADA USER PLAYLIST</span>
                    <span className="italic text-marmut-600">Anda tidak memiliki playlist, tambahkan playlist melalui tombol di bawah :D</span>
                </div>
                <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={addPlaylistModal.open}>
                    <HiOutlinePlusSm size={23} />
                    <span>Tambah playlist</span>
                </button>
            </div>
        ) : (
            <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-4">
                <PlaylistModal
                    isOpen={addPlaylistModal.isOpen}
                    onClose={addPlaylistModal.close}
                    primaryButtonCallback={handleAddPlaylist}
                    status={"ADD"}
                />
                <span className="flex text-2xl font-bold">User Playlist</span>
                <main className="flex flex-col gap-[10px] w-full">
                    <div className="grid grid-cols-6 px-3">
                        <div className="col-span-2 flex-row items-center px-2">
                            <span className="font-semibold text-[18px]">Judul</span>
                        </div>
                        <div className="col-span-1 flex-row items-center px-2">
                            <span className="font-semibold text-[18px]">Jumlah Lagu</span>
                        </div>
                        <div className="col-span-2 flex-row items-center px-2">
                            <span className="font-semibold text-[18px]">Total Durasi</span>
                        </div>
                        <div className="col-span-1 flex-row items-center px-2 text-center">
                            <span className="font-semibold text-[18px]">Action</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {userPlaylist.map((props, key) => (
                            <PlaylistRow
                                key={key}
                                data={props}
                                handleRemovePlaylist={handleRemovePlaylist}
                                handleEditPlaylist={handleEditPlaylist}
                            />
                        ))}
                    </div>
                </main>
                <div>
                    <button className="bg-marmut-dark-green-300 text-marmut-000 flex flex-row gap-2 py-2 px-3 items-center rounded-md" onClick={addPlaylistModal.open}>
                        <HiOutlinePlusSm size={23} />
                        <text>Tambah playlist</text>
                    </button>
                </div>
            </div>
        )
    );
};

export default Playlist;
