"use client"

import { registerLabel } from "@/actions/registerLabel";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Label: React.FC = () => {

    const router = useRouter()

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await registerLabel(formData);
            router.push('/login')

          } catch (error) {
            console.error("Failed to register label:", error);
          }
    }

    return (
        <div className="px-[120px] flex justify-center py-[90px]">
            <form onSubmit={handleRegister} className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">

                <div>
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Nama</label>
                    <input name="nama" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Kontak</label>
                    <input name="kontak" className="form-control border-stonks-600" />
                </div>
            </form>
        </div>
    )
}

export default Label;