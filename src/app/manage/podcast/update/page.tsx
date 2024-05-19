"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { updatePodcast } from "@/actions/podcast/manage/updatePodcast";
import { useAuth } from "@/contexts";

const SuspenseCreatePodcast: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreatePodcast />
        </Suspense>
    );
};

const CreatePodcast: React.FC = () => {
    const router = useRouter();
    const { email } = useAuth();
    const searchParams = useSearchParams();
    const idPodcast = searchParams.get('id_konten') as string;
    const [selectedOptions, setSelectedOptions] = useState({
        'romance-flag': false,
        'funny-flag': false,
        'family-flag': false,
        'politics-flag': false,
        'education-flag': false,
    });

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [name]: checked,
        }));
    };
    
    const handleUpdatePodcast = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            if (formData.get('judul') === '') {
                alert('Judul is required and cannot be an empty string.');
                return; // Prevent form submission
            }
            
            const atLeastOneChecked = Object.values(selectedOptions).some(
                (isChecked) => isChecked
            );
            
            if (!atLeastOneChecked) {
                alert('Please select at least one option.');
                return; // Prevent form submission
            }

            await updatePodcast(formData, email, idPodcast);
            router.replace(`/manage/podcast`);

        } catch (error) {
            console.error("Failed to update podcast:", error);
            alert("Failed to update podcast. Please try again later.");
        }
    };

    return (
        <div className="px-[120px] flex justify-center py-[90px]">
            <form onSubmit={handleUpdatePodcast} className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">
                <p className="center text-xl font-bold">Update Podcast</p>
                <div>
                    <label className="form-label">Judul</label>
                    <input name="judul" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Genre</label>

                    <div className="flex fliex-row justify-between">
                        {Object.entries(selectedOptions).map(([key, value]) => (
                            <div className="flex gap-2" key={key}>
                                <input className="form-check-input border-stonks-500" name={key} type="checkbox" value="1" 
                                checked={value} onChange={handleCheckboxChange}/>
                                <label>{key.split('-')[0]}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="text-white bg-marmut-green-600 p-3 rounded-xl">Submit</button>
            </form>
        </div>
    )
}

export default SuspenseCreatePodcast;
