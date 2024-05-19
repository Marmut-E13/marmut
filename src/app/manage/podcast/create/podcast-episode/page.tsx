"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { addEpisode } from "@/actions/podcast/manage/addEpisode";

const CreatePodcastEpisode: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    const idPodcast = searchParams.get('id_konten') as string;
    
    const handleAddEpisode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            if (formData.get('judul') as string === '' || formData.get('deskripsi') as string === '' || formData.get('durasi') as string === '') {
                alert('Field tidak boleh ada yang kosong');
                return; // Prevent form submission
            }

            if (parseInt(formData.get('durasi') as string) <= 0) {
                alert('Durasi tidak boleh <= 0');
                return; // Prevent form submission
            }

            await addEpisode(formData, idPodcast);
            router.replace(`/manage/podcast`)

          } catch (error) {
            console.error("Failed to add podcast:", error);
          }
    }

    return (
        <div className="px-[120px] flex justify-center py-[90px]">
            <form onSubmit={handleAddEpisode} className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">
                <p className="center text-xl font-bold">Create Episode</p>
                <div>
                    <label className="form-label">Judul</label>
                    <input name="judul" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Deskripsi</label>
                    <textarea name="deskripsi" className="form-control border-stonks-600" rows={5}/>
                </div>

                <div>
                    <label className="form-label">Durasi</label>
                    <input name="durasi" className="form-control border-stonks-600" />
                </div>

                <button type="submit" className="text-white bg-marmut-green-600 p-3 rounded-xl ">Submit</button>
            </form>
        </div>
    )
}

export default CreatePodcastEpisode;