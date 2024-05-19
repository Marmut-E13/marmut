"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { addPodcast } from "@/actions/podcast/manage/addPodcast"
import { useAuth } from "@/contexts";


const CreatePodcast: React.FC = () => {
    const router = useRouter();
    
    const { email } = useAuth();


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
    
    const handleAddPodcast = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            if (formData.get('judul') as string === '') {
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

            await addPodcast(formData, email);
            router.replace(`/manage/podcast`)

          } catch (error) {
            console.error("Failed to add podcast:", error);
          }
    }

    return (
        <div className="px-[120px] flex justify-center py-[90px]">
            
            <form onSubmit={handleAddPodcast} className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">
                <p className="center text-xl font-bold">Create Podcast</p>
                <div>
                    <label className="form-label">Judul</label>
                    <input name="judul" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Genre</label>

                    <div className="flex fliex-row justify-between">
                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="romance-flag" type="checkbox" value="1" 
                            checked={selectedOptions['romance-flag']} onChange={handleCheckboxChange}/>
                            <label>Romance</label>
                        </div>

                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="funny-flag" type="checkbox" value="1" 
                            checked={selectedOptions['funny-flag']} onChange={handleCheckboxChange}/>
                            <label>Funny</label>
                        </div>

                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="family-flag" type="checkbox" value="1" 
                            checked={selectedOptions['family-flag']} onChange={handleCheckboxChange}/>
                            <label>Family</label>
                        </div>

                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="politics-flag" type="checkbox" value="1"
                            checked={selectedOptions['politics-flag']} onChange={handleCheckboxChange}/>
                            <label>Politics</label>
                        </div>

                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="education-flag" type="checkbox" value="1"
                            checked={selectedOptions['education-flag']} onChange={handleCheckboxChange}/>
                            <label>Education</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="text-white bg-marmut-green-600 p-3 rounded-xl">Submit</button>
            </form>
        </div>
    )
}

export default CreatePodcast;