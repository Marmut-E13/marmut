"use client"

import { updatePlaylist } from "@/actions/playlist";
import { useState, FormEvent, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    primaryButtonCallback: (formData: FormData) => void;
    status: 'ADD' | 'EDIT';
    value?: { judul: string, deskripsi: string };
}

export const PlaylistModal: React.FC<ModalProps> = ({
    isOpen, onClose, primaryButtonCallback, status, value
}) => {
    const [formValues, setFormValues] = useState({
        judul: value?.judul || "",
        deskripsi: value?.deskripsi || ""
    });

    useEffect(() => {
        setFormValues({
            judul: value?.judul || "",
            deskripsi: value?.deskripsi || ""
        });
    }, [value, isOpen]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        primaryButtonCallback(formData);
    };

    const handleClose = () => {
        onClose();
        setFormValues({
            judul: value?.judul || "",
            deskripsi: value?.deskripsi || ""
        });
    };

    return (
        <div className={`fixed z-[999] top-0 left-0 w-full h-full flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="flex flex-col w-[40%] gap-1 bg-marmut-000 rounded-xl p-6 text-marmut-900">
                <div className="flex justify-end">
                    <button className="hover:bg-marmut-100 hover:text-marmut-600 p-2 rounded-[6px] text-[22px]" onClick={handleClose}>
                        <HiOutlineX />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-[45px] pb-2">
                    <div className="flex justify-center">
                        <text className="text-2xl font-semibold">{status === 'ADD' ? 'Add' : 'Edit'} PLAYLIST</text>
                    </div>

                    <div className="flex flex-col gap-[14px]">
                        <div className="flex flex-col gap-[2px]">
                            <text className="font-semibold">Name</text>
                            <input
                                className="px-3 py-[6px] border-[2px] border-marmut-dark-green-300 rounded-md bg-marmut-000 text-[16px]"
                                name="judul"
                                placeholder="Playlist name"
                                value={formValues.judul}
                                onChange={(e) => setFormValues({ ...formValues, judul: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-[2px]">
                            <text className="font-semibold">Description</text>
                            <textarea
                                className="px-3 py-[6px] border-[2px] border-marmut-dark-green-300 rounded-md bg-marmut-000 text-[16px]"
                                name="deskripsi"
                                placeholder="Playlist description"
                                value={formValues.deskripsi}
                                onChange={(e) => setFormValues({ ...formValues, deskripsi: e.target.value })}
                            />
                        </div>
                    </div>

                    <button className="mt-3 bg-marmut-dark-green-300 text-marmut-000 flex flex-row justify-center py-2 px-3 items-center rounded-md" type="submit">
                        {status === "ADD" ? "Add" : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};
