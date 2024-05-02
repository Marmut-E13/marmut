"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { registerUser } from "@/actions/registerUser";

const CreatePodcast: React.FC = () => {
    const router = useRouter();

    return (
        <div className="px-[120px] flex justify-center py-[90px]">
            
            <form className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">
                <p className="center text-xl font-bold">Create Podcast</p>
                <div>
                    <label className="form-label">Judul</label>
                    <input name="judul" type="email" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Genre</label>
                    <input name="genre" type="password" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Durasi</label>
                    <input name="durasi" className="form-control border-stonks-600" />
                </div>

                <button type="submit" className="bg">Submit</button>
            </form>
        </div>
    )
}

export default CreatePodcast;